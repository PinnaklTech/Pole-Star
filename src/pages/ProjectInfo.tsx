import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ProjectInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    engineerName: "",
    date: new Date().toISOString().split('T')[0],
    poleType: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    navigate("/environmental");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Project Information</h2>
        <p className="text-muted-foreground">
          Enter basic project details to begin the steel transmission pole design process.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Provide the fundamental information for this transmission pole design project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="Enter project name"
                value={formData.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State/Province"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineerName">Engineer Name</Label>
              <Input
                id="engineerName"
                placeholder="Design engineer name"
                value={formData.engineerName}
                onChange={(e) => handleInputChange("engineerName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Design Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="poleType">Pole Type</Label>
            <Select onValueChange={(value) => handleInputChange("poleType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select pole configuration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Pole</SelectItem>
                <SelectItem value="h-frame">H-Frame</SelectItem>
                <SelectItem value="guyed">Guyed Structure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleNext} className="px-8">
              Next: Environmental Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}