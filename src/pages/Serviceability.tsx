import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, CheckCircle, AlertTriangle } from "lucide-react";

export default function Serviceability() {
  const navigate = useNavigate();
  const [deflectionLimit, setDeflectionLimit] = useState("4.8"); // H/200
  
  const calculatedDeflection = 2.8;
  const passes = calculatedDeflection <= parseFloat(deflectionLimit);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Serviceability Checks</h2>
        <p className="text-muted-foreground">
          Verify deflection limits and other serviceability requirements under service loads.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Deflection Criteria
            </CardTitle>
            <CardDescription>
              Set allowable deflection limits for service conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deflectionLimit">Maximum Deflection Limit (inches)</Label>
              <Input
                id="deflectionLimit"
                type="number"
                value={deflectionLimit}
                onChange={(e) => setDeflectionLimit(e.target.value)}
                placeholder="4.8"
                step="0.1"
              />
              <p className="text-sm text-muted-foreground">
                Typical limit: H/200 = 80ft × 12in/ft ÷ 200 = 4.8 inches
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Standard Limits</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button 
                  className="p-2 text-left rounded border hover:bg-muted"
                  onClick={() => setDeflectionLimit("4.8")}
                >
                  <div className="font-medium">H/200</div>
                  <div className="text-muted-foreground">4.8 inches</div>
                </button>
                <button 
                  className="p-2 text-left rounded border hover:bg-muted"
                  onClick={() => setDeflectionLimit("3.2")}
                >
                  <div className="font-medium">H/300</div>
                  <div className="text-muted-foreground">3.2 inches</div>
                </button>
                <button 
                  className="p-2 text-left rounded border hover:bg-muted"
                  onClick={() => setDeflectionLimit("2.4")}
                >
                  <div className="font-medium">H/400</div>
                  <div className="text-muted-foreground">2.4 inches</div>
                </button>
                <button 
                  className="p-2 text-left rounded border hover:bg-muted"
                  onClick={() => setDeflectionLimit("6.0")}
                >
                  <div className="font-medium">Custom</div>
                  <div className="text-muted-foreground">6.0 inches</div>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deflection Results</CardTitle>
            <CardDescription>
              Calculated top deflection under service wind loads
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {calculatedDeflection}" 
                </div>
                <div className="text-sm text-muted-foreground">
                  Calculated deflection at pole top
                </div>
              </div>

              <Badge 
                variant={passes ? "default" : "destructive"} 
                className="text-base px-4 py-2"
              >
                {passes ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    PASS
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    FAIL
                  </>
                )}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-sm font-medium">Calculated:</span>
                <span className="text-lg font-semibold">{calculatedDeflection}"</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-sm font-medium">Allowable:</span>
                <span className="text-lg font-semibold">{deflectionLimit}"</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-sm font-medium">Utilization:</span>
                <span className={`text-lg font-semibold ${passes ? 'text-success' : 'text-destructive'}`}>
                  {((calculatedDeflection / parseFloat(deflectionLimit)) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Serviceability Analysis</CardTitle>
          <CardDescription>
            Detailed deflection calculation and additional serviceability checks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Load Conditions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service Wind Load:</span>
                    <span className="font-medium">5.4 kips</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load Height:</span>
                    <span className="font-medium">60 ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moment at Base:</span>
                    <span className="font-medium">324 kip-ft</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Material Properties</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Elastic Modulus:</span>
                    <span className="font-medium">29,000 ksi</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moment of Inertia:</span>
                    <span className="font-medium">890 in⁴</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effective Length:</span>
                    <span className="font-medium">80 ft</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Calculation</h4>
                <div className="bg-muted p-3 rounded text-sm font-mono space-y-1">
                  <div>δ = PL³/(3EI)</div>
                  <div>δ = (5.4 × 1000) × (80 × 12)³ / (3 × 29000 × 890)</div>
                  <div>δ = 5400 × 1,728,000 / 77,355,000</div>
                  <div>δ = 2.8 inches</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Additional Checks</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vibration</span>
                    <Badge variant="default">Pass</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conductor Clearance</span>
                    <Badge variant="default">Pass</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fatigue</span>
                    <Badge variant="default">Pass</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/checks")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/connections")}>
          Next: Connections & Foundations
        </Button>
      </div>
    </div>
  );
}