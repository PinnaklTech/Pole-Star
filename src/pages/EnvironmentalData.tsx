import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Wind, Snowflake } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";

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
    <PageContainer maxWidth="6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-b">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-primary" />
              <CardTitle>Wind Loading</CardTitle>
            </div>
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

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 border-b">
            <div className="flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-cyan-600" />
              <CardTitle>Ice & Temperature</CardTitle>
            </div>
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

      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-b">
          <CardTitle>Climate Map Integration</CardTitle>
          <CardDescription>
            Geographic climate data will be integrated in future versions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <p className="text-muted-foreground">Interactive climate map placeholder</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/")} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/geometry")} size="lg" className="gap-2">
          Next: Pole Geometry
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </PageContainer>
  );
}