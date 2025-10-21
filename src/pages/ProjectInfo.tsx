import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

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
    <PageContainer>
      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
          <CardTitle className="text-2xl">Project Details</CardTitle>
          <CardDescription className="text-base">
            Provide the fundamental information for this transmission pole design project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
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

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleNext} className="px-8 gap-2" size="lg">
              Next: Environmental Data
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}