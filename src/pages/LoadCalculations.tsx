import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calculator, Edit } from "lucide-react";

const loadCases = [
  { id: "D", name: "Dead Load", description: "Permanent loads", value: "2.4 kips", status: "calculated" },
  { id: "W", name: "Wind Load", description: "Wind on conductors and structure", value: "8.7 kips", status: "calculated" },
  { id: "I", name: "Ice Load", description: "Ice accumulation", value: "1.2 kips", status: "calculated" },
  { id: "BW", name: "Broken Wire", description: "Unbalanced tension", value: "15.0 kips", status: "calculated" },
  { id: "1.2D+1.6W", name: "Factored Combo 1", description: "LRFD Combination", value: "16.8 kips", status: "critical" },
  { id: "1.2D+1.0W+1.0I", name: "Factored Combo 2", description: "LRFD Combination", value: "12.3 kips", status: "calculated" },
  { id: "1.2D+1.0BW", name: "Factored Combo 3", description: "LRFD Combination", value: "17.9 kips", status: "critical" },
];

export default function LoadCalculations() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "calculated": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Load Calculations</h2>
        <p className="text-muted-foreground">
          Automatic calculation of load cases according to ASCE/SEI 48-19 load combinations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Load Case Summary
            </CardTitle>
            <CardDescription>
              Calculated loads based on environmental data and conductor configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Load Case</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Load Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadCases.map((loadCase) => (
                  <TableRow key={loadCase.id}>
                    <TableCell className="font-medium">{loadCase.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{loadCase.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {loadCase.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{loadCase.value}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(loadCase.status)}>
                        {loadCase.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Critical Load Case</CardTitle>
              <CardDescription>
                Governing combination for design
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">1.2D + 1.0BW</div>
                  <div className="text-lg font-semibold">17.9 kips</div>
                  <div className="text-sm text-muted-foreground">Maximum factored load</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Base Shear:</span>
                    <span className="font-medium">17.9 kips</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Base Moment:</span>
                    <span className="font-medium">1,432 kip-ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Uplift:</span>
                    <span className="font-medium">425 kips</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Load Factors</CardTitle>
              <CardDescription>
                ASCE 48-19 load factors applied
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Dead Load Factor:</span>
                  <span className="font-medium">1.2</span>
                </div>
                <div className="flex justify-between">
                  <span>Wind Load Factor:</span>
                  <span className="font-medium">1.6</span>
                </div>
                <div className="flex justify-between">
                  <span>Ice Load Factor:</span>
                  <span className="font-medium">1.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Broken Wire Factor:</span>
                  <span className="font-medium">1.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/conductor")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/analysis")}>
          Next: Structural Analysis
        </Button>
      </div>
    </div>
  );
}