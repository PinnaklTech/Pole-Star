import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";

export default function StructuralAnalysis() {
  const navigate = useNavigate();
  const [analysisMethod, setAnalysisMethod] = useState(false); // false = Simple, true = FEM

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Structural Analysis</h2>
        <p className="text-muted-foreground">
          Analyze structural response under design loads with visual force diagrams.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Analysis Configuration
            </CardTitle>
            <CardDescription>
              Select analysis method and review structural model
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="analysis-method"
                checked={analysisMethod}
                onCheckedChange={setAnalysisMethod}
              />
              <Label htmlFor="analysis-method">
                {analysisMethod ? "Finite Element Method" : "Simplified Method"}
              </Label>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Analysis Parameters</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Elements:</span>
                    <span className="font-medium">
                      {analysisMethod ? "20 beam elements" : "Single cantilever"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>DOF:</span>
                    <span className="font-medium">
                      {analysisMethod ? "126" : "6"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load Steps:</span>
                    <span className="font-medium">7</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Convergence:</span>
                    <span className="font-medium text-success">Achieved</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Iterations:</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Analysis Time:</span>
                    <span className="font-medium">0.8s</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Key Results</h4>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Max Deflection:</span>
                  <span className="font-semibold">2.8 inches</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Moment:</span>
                  <span className="font-semibold">1,432 kip-ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Stress:</span>
                  <span className="font-semibold">32.5 ksi</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Structural Model</CardTitle>
            <CardDescription>
              Pole geometry with applied loads and boundary conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">3D Structural Model</p>
                <p className="text-sm text-muted-foreground">
                  Interactive visualization with load application
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Moment Diagram</CardTitle>
            <CardDescription>
              Bending moment distribution along pole height
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Moment Diagram</p>
                <p className="text-sm text-muted-foreground">
                  Max: 1,432 kip-ft at base
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shear Diagram</CardTitle>
            <CardDescription>
              Shear force distribution along pole height
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Shear Diagram</p>
                <p className="text-sm text-muted-foreground">
                  Max: 17.9 kips at base
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/loads")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/checks")}>
          Next: Design Checks
        </Button>
      </div>
    </div>
  );
}