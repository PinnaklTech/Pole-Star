import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PoleGeometry() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    poleHeight: "",
    baseDiameter: "",
    topDiameter: "",
    wallThickness: "",
    taperRatio: "",
    crossArmType: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Pole Geometry</h2>
        <p className="text-muted-foreground">
          Define the structural geometry and cross-sectional properties of the transmission pole.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Dimensions</CardTitle>
              <CardDescription>
                Primary structural dimensions for the pole shaft
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="poleHeight">Height (ft)</Label>
                  <Input
                    id="poleHeight"
                    type="number"
                    placeholder="80"
                    value={formData.poleHeight}
                    onChange={(e) => handleInputChange("poleHeight", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taperRatio">Taper Ratio</Label>
                  <Input
                    id="taperRatio"
                    type="number"
                    placeholder="0.006"
                    step="0.001"
                    value={formData.taperRatio}
                    onChange={(e) => handleInputChange("taperRatio", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="baseDiameter">Base Diameter (in)</Label>
                  <Input
                    id="baseDiameter"
                    type="number"
                    placeholder="24"
                    value={formData.baseDiameter}
                    onChange={(e) => handleInputChange("baseDiameter", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topDiameter">Top Diameter (in)</Label>
                  <Input
                    id="topDiameter"
                    type="number"
                    placeholder="12"
                    value={formData.topDiameter}
                    onChange={(e) => handleInputChange("topDiameter", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallThickness">Wall Thickness (in)</Label>
                <Input
                  id="wallThickness"
                  type="number"
                  placeholder="0.25"
                  step="0.01"
                  value={formData.wallThickness}
                  onChange={(e) => handleInputChange("wallThickness", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cross-Arm Configuration</CardTitle>
              <CardDescription>
                Attachment configuration for conductor support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="crossArmType">Cross-Arm Type</Label>
                <Select onValueChange={(value) => handleInputChange("crossArmType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cross-arm configuration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="horizontal">Horizontal Cross-Arm</SelectItem>
                    <SelectItem value="vertical">Vertical Configuration</SelectItem>
                    <SelectItem value="davit">Davit Arm</SelectItem>
                    <SelectItem value="double">Double Cross-Arm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pole Diagram</CardTitle>
            <CardDescription>
              Visual representation of the pole geometry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Pole geometry diagram</p>
                <p className="text-sm text-muted-foreground">
                  Interactive 3D visualization will be available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/environmental")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/conductor")}>
          Next: Conductor Data
        </Button>
      </div>
    </div>
  );
}