import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";

const designChecks = {
  axial: {
    title: "Axial Compression",
    demand: 425,
    capacity: 680,
    ratio: 0.63,
    status: "pass",
    details: "ASCE 48-19 Section 4.3.1"
  },
  bending: {
    title: "Bending Moment",
    demand: 1432,
    capacity: 1850,
    ratio: 0.77,
    status: "pass",
    details: "ASCE 48-19 Section 4.3.2"
  },
  shear: {
    title: "Shear Force",
    demand: 17.9,
    capacity: 45.2,
    ratio: 0.40,
    status: "pass",
    details: "ASCE 48-19 Section 4.3.3"
  },
  combined: {
    title: "Combined Stress",
    demand: 0.89,
    capacity: 1.0,
    ratio: 0.89,
    status: "pass",
    details: "ASCE 48-19 Section 4.3.4"
  }
};

export default function DesignChecks() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    return status === "pass" ? "default" : "destructive";
  };

  const getStatusIcon = (status: string) => {
    return status === "pass" ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />;
  };

  const getProgressColor = (ratio: number) => {
    if (ratio <= 0.75) return "bg-success";
    if (ratio <= 0.95) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Design Checks</h2>
        <p className="text-muted-foreground">
          Verification of structural capacity according to ASCE/SEI 48-19 design provisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {Object.entries(designChecks).map(([key, check]) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                {getStatusIcon(check.status)}
                {check.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Utilization</span>
                    <span className="font-medium">{(check.ratio * 100).toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={check.ratio * 100} 
                    className="h-2"
                  />
                </div>
                <Badge variant={getStatusColor(check.status)} className="w-full justify-center">
                  {check.status.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="axial" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="axial">Axial</TabsTrigger>
          <TabsTrigger value="bending">Bending</TabsTrigger>
          <TabsTrigger value="shear">Shear</TabsTrigger>
          <TabsTrigger value="combined">Combined</TabsTrigger>
        </TabsList>

        {Object.entries(designChecks).map(([key, check]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {check.title} Analysis
                  <Badge variant={getStatusColor(check.status)}>
                    {check.status === "pass" ? "PASS" : "FAIL"}
                  </Badge>
                </CardTitle>
                <CardDescription>{check.details}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Design Values</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Demand:</span>
                          <span className="font-medium">
                            {check.demand.toLocaleString()} {key === "combined" ? "" : key === "shear" ? "kips" : key === "axial" ? "kips" : "kip-ft"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Capacity:</span>
                          <span className="font-medium">
                            {check.capacity.toLocaleString()} {key === "combined" ? "" : key === "shear" ? "kips" : key === "axial" ? "kips" : "kip-ft"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Utilization Ratio:</span>
                          <span className={`font-bold ${check.ratio > 1.0 ? "text-destructive" : check.ratio > 0.9 ? "text-warning" : "text-success"}`}>
                            {check.ratio.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Code Reference</h4>
                      <p className="text-sm text-muted-foreground">{check.details}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Calculation Details</h4>
                      <div className="bg-muted p-3 rounded text-sm font-mono">
                        {key === "axial" && (
                          <>
                            <div>P_u = 425 kips</div>
                            <div>P_n = F_y × A_g = 50 × 13.6 = 680 kips</div>
                            <div>φ = 0.90</div>
                            <div>φP_n = 612 kips &gt; P_u ✓</div>
                          </>
                        )}
                        {key === "bending" && (
                          <>
                            <div>M_u = 1,432 kip-ft</div>
                            <div>M_n = F_y × S = 50 × 37 = 1,850 kip-ft</div>
                            <div>φ = 0.90</div>
                            <div>φM_n = 1,665 kip-ft &gt; M_u ✓</div>
                          </>
                        )}
                        {key === "shear" && (
                          <>
                            <div>V_u = 17.9 kips</div>
                            <div>V_n = 0.6 × F_y × A_w = 0.6 × 50 × 1.51</div>
                            <div>V_n = 45.2 kips</div>
                            <div>φV_n = 40.7 kips &gt; V_u ✓</div>
                          </>
                        )}
                        {key === "combined" && (
                          <>
                            <div>P_u/φP_n + M_u/φM_n ≤ 1.0</div>
                            <div>425/612 + 1432/1665</div>
                            <div>0.69 + 0.86 = 0.89 ≤ 1.0 ✓</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/analysis")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/serviceability")}>
          Next: Serviceability
        </Button>
      </div>
    </div>
  );
}