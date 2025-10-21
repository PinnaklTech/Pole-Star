from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from middleware.auth import get_current_user

router = APIRouter()

# In-memory storage for demo (replace with database)
projects_db = {}

class ProjectCreate(BaseModel):
    name: str
    location: str
    engineer_name: str
    pole_type: str

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    engineer_name: Optional[str] = None
    pole_type: Optional[str] = None

class ProjectResponse(BaseModel):
    id: str
    name: str
    location: str
    engineer_name: str
    pole_type: str
    created_at: datetime
    updated_at: datetime
    user_id: str

@router.get("/", response_model=List[ProjectResponse])
async def get_projects(current_user: dict = Depends(get_current_user)):
    """Get all projects for the current user"""
    user_id = current_user["ocid"]
    user_projects = [p for p in projects_db.values() if p["user_id"] == user_id]
    return user_projects

@router.post("/", response_model=ProjectResponse)
async def create_project(project: ProjectCreate, current_user: dict = Depends(get_current_user)):
    """Create a new project"""
    user_id = current_user["ocid"]
    project_id = f"proj_{len(projects_db) + 1}"
    
    new_project = {
        "id": project_id,
        "name": project.name,
        "location": project.location,
        "engineer_name": project.engineer_name,
        "pole_type": project.pole_type,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "user_id": user_id
    }
    
    projects_db[project_id] = new_project
    return new_project

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str, current_user: dict = Depends(get_current_user)):
    """Get a specific project"""
    user_id = current_user["ocid"]
    
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project = projects_db[project_id]
    if project["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return project

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: str, project_update: ProjectUpdate, current_user: dict = Depends(get_current_user)):
    """Update a project"""
    user_id = current_user["ocid"]
    
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project = projects_db[project_id]
    if project["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Update fields
    for field, value in project_update.dict(exclude_unset=True).items():
        project[field] = value
    
    project["updated_at"] = datetime.utcnow()
    projects_db[project_id] = project
    
    return project

@router.delete("/{project_id}")
async def delete_project(project_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a project"""
    user_id = current_user["ocid"]
    
    if project_id not in projects_db:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project = projects_db[project_id]
    if project["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    del projects_db[project_id]
    return {"message": "Project deleted successfully"}
