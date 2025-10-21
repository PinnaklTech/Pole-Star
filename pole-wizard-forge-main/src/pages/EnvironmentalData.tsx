import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EnvironmentalData() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    windSpeed: "",
    exposureCategory: "",
    iceThickness: "",
    tempMin: "",
    tempMax: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Environmental Data</h2>
        <p className="text-muted-foreground">
          Define environmental loading conditions according to ASCE/SEI 48-19 requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wind Loading</CardTitle>
            <CardDescription>
              Critical wind parameters for structural analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="windSpeed">Basic Wind Speed (mph)</Label>
              <Input
                id="windSpeed"
                type="number"
                placeholder="110"
                value={formData.windSpeed}
                onChange={(e) => handleInputChange("windSpeed", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exposureCategory">Exposure Category</Label>
              <Select onValueChange={(value) => handleInputChange("exposureCategory", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exposure category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B">Category B - Urban/Suburban</SelectItem>
                  <SelectItem value="C">Category C - Open Terrain</SelectItem>
                  <SelectItem value="D">Category D - Flat/Water</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ice & Temperature</CardTitle>
            <CardDescription>
              Additional environmental loading factors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="iceThickness">Ice Thickness (inches)</Label>
              <Input
                id="iceThickness"
                type="number"
                placeholder="0.50"
                step="0.1"
                value={formData.iceThickness}
                onChange={(e) => handleInputChange("iceThickness", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tempMin">Min Temp (°F)</Label>
                <Input
                  id="tempMin"
                  type="number"
                  placeholder="-10"
                  value={formData.tempMin}
                  onChange={(e) => handleInputChange("tempMin", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tempMax">Max Temp (°F)</Label>
                <Input
                  id="tempMax"
                  type="number"
                  placeholder="120"
                  value={formData.tempMax}
                  onChange={(e) => handleInputChange("tempMax", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Climate Map Integration</CardTitle>
          <CardDescription>
            Geographic climate data will be integrated in future versions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-muted-foreground">Interactive climate map placeholder</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/geometry")}>
          Next: Pole Geometry
        </Button>
      </div>
    </div>
  );
}