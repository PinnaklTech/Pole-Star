from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, List
import math
from middleware.auth import get_current_user

router = APIRouter()

class WindLoadInput(BaseModel):
    wind_speed: float  # mph
    exposure_category: str  # B, C, or D
    pole_height: float  # ft
    conductor_diameter: float  # in
    conductor_span: float  # ft

class IceLoadInput(BaseModel):
    ice_thickness: float  # in
    conductor_diameter: float  # in
    conductor_span: float  # ft
    ice_density: float = 56.2  # pcf

class StructuralAnalysisInput(BaseModel):
    pole_height: float  # ft
    base_diameter: float  # in
    top_diameter: float  # in
    wall_thickness: float  # in
    material_yield_strength: float = 50.0  # ksi
    elastic_modulus: float = 29000.0  # ksi

class CalculationResult(BaseModel):
    result: Dict[str, Any]
    status: str
    message: str

@router.post("/wind-load", response_model=CalculationResult)
async def calculate_wind_load(input_data: WindLoadInput, current_user: dict = Depends(get_current_user)):
    """Calculate wind loads per ASCE 48-19"""
    try:
        # Exposure factors per ASCE 7-16
        exposure_factors = {
            "B": {"Kz": 0.57, "alpha": 7.0},
            "C": {"Kz": 0.85, "alpha": 9.5},
            "D": {"Kz": 1.03, "alpha": 11.5}
        }
        
        exp_factor = exposure_factors.get(input_data.exposure_category, exposure_factors["C"])
        
        # Basic wind speed to pressure conversion
        V = input_data.wind_speed  # mph
        qz = 0.00256 * (V ** 2) * exp_factor["Kz"]  # psf
        
        # Wind load on conductor
        conductor_area = input_data.conductor_diameter * input_data.conductor_span / 12  # ft²
        conductor_wind_load = qz * conductor_area  # lbs
        
        # Wind load on pole (simplified)
        pole_area = (input_data.pole_height * 12) * 0.5  # Simplified pole area
        pole_wind_load = qz * pole_area * 0.8  # 0.8 is shape factor
        
        total_wind_load = conductor_wind_load + pole_wind_load
        
        return CalculationResult(
            result={
                "conductor_wind_load": round(conductor_wind_load, 2),
                "pole_wind_load": round(pole_wind_load, 2),
                "total_wind_load": round(total_wind_load, 2),
                "wind_pressure": round(qz, 2),
                "exposure_factor": exp_factor["Kz"]
            },
            status="success",
            message="Wind load calculated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Calculation error: {str(e)}")

@router.post("/ice-load", response_model=CalculationResult)
async def calculate_ice_load(input_data: IceLoadInput, current_user: dict = Depends(get_current_user)):
    """Calculate ice loads per ASCE 48-19"""
    try:
        # Ice load calculation
        conductor_radius = input_data.conductor_diameter / 2  # in
        ice_radius = conductor_radius + input_data.ice_thickness  # in
        
        # Ice weight per unit length
        ice_area = math.pi * (ice_radius ** 2 - conductor_radius ** 2)  # in²
        ice_weight_per_inch = ice_area * input_data.ice_density / 144  # lbs/in
        
        # Total ice load for span
        total_ice_load = ice_weight_per_inch * input_data.conductor_span * 12  # lbs
        
        return CalculationResult(
            result={
                "ice_thickness": input_data.ice_thickness,
                "ice_weight_per_foot": round(ice_weight_per_inch * 12, 2),
                "total_ice_load": round(total_ice_load, 2),
                "ice_density": input_data.ice_density
            },
            status="success",
            message="Ice load calculated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Calculation error: {str(e)}")

@router.post("/structural-analysis", response_model=CalculationResult)
async def perform_structural_analysis(input_data: StructuralAnalysisInput, current_user: dict = Depends(get_current_user)):
    """Perform structural analysis per ASCE 48-19"""
    try:
        # Calculate section properties
        base_radius = input_data.base_diameter / 2
        top_radius = input_data.top_diameter / 2
        
        # Average radius for simplified calculation
        avg_radius = (base_radius + top_radius) / 2
        
        # Cross-sectional area
        area = math.pi * (avg_radius ** 2 - (avg_radius - input_data.wall_thickness) ** 2)
        
        # Moment of inertia
        outer_radius = avg_radius
        inner_radius = avg_radius - input_data.wall_thickness
        moment_of_inertia = math.pi * (outer_radius ** 4 - inner_radius ** 4) / 4
        
        # Section modulus
        section_modulus = moment_of_inertia / outer_radius
        
        # Axial capacity
        axial_capacity = area * input_data.material_yield_strength * 1000  # lbs
        
        # Bending capacity
        bending_capacity = section_modulus * input_data.material_yield_strength * 1000 / 12  # lb-ft
        
        return CalculationResult(
            result={
                "cross_sectional_area": round(area, 2),
                "moment_of_inertia": round(moment_of_inertia, 2),
                "section_modulus": round(section_modulus, 2),
                "axial_capacity": round(axial_capacity, 0),
                "bending_capacity": round(bending_capacity, 0),
                "material_yield_strength": input_data.material_yield_strength,
                "elastic_modulus": input_data.elastic_modulus
            },
            status="success",
            message="Structural analysis completed successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Calculation error: {str(e)}")

@router.get("/materials")
async def get_material_properties():
    """Get standard material properties"""
    materials = {
        "ASTM A572 Grade 50": {
            "yield_strength": 50.0,  # ksi
            "tensile_strength": 65.0,  # ksi
            "elastic_modulus": 29000.0,  # ksi
            "density": 490.0  # pcf
        },
        "ASTM A572 Grade 60": {
            "yield_strength": 60.0,
            "tensile_strength": 75.0,
            "elastic_modulus": 29000.0,
            "density": 490.0
        },
        "ASTM A992": {
            "yield_strength": 50.0,
            "tensile_strength": 65.0,
            "elastic_modulus": 29000.0,
            "density": 490.0
        }
    }
    return materials
