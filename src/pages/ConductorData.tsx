import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface Conductor {
  id: string;
  type: string;
  weight: string;
  diameter: string;
  tension: string;
  hardwareWeight: string;
}

export default function ConductorData() {
  const navigate = useNavigate();
  const [conductors, setConductors] = useState<Conductor[]>([
    {
      id: "1",
      type: "",
      weight: "",
      diameter: "",
      tension: "",
      hardwareWeight: "",
    },
  ]);

  const addConductor = () => {
    setConductors([
      ...conductors,
      {
        id: Date.now().toString(),
        type: "",
        weight: "",
        diameter: "",
        tension: "",
        hardwareWeight: "",
      },
    ]);
  };

  const removeConductor = (id: string) => {
    setConductors(conductors.filter((c) => c.id !== id));
  };

  const updateConductor = (id: string, field: keyof Conductor, value: string) => {
    setConductors(
      conductors.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Conductor Data</h2>
        <p className="text-muted-foreground">
          Define conductor specifications and loading for each phase and ground wire.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Conductor Configuration
            <Button onClick={addConductor} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Conductor
            </Button>
          </CardTitle>
          <CardDescription>
            Enter specifications for each conductor including phases and ground wires
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Conductor Type</TableHead>
                  <TableHead>Weight (lbs/ft)</TableHead>
                  <TableHead>Diameter (in)</TableHead>
                  <TableHead>Max Tension (lbs)</TableHead>
                  <TableHead>Hardware Weight (lbs)</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conductors.map((conductor) => (
                  <TableRow key={conductor.id}>
                    <TableCell>
                      <Select
                        onValueChange={(value) =>
                          updateConductor(conductor.id, "type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="acsr-477">ACSR 477 kcmil</SelectItem>
                          <SelectItem value="acsr-795">ACSR 795 kcmil</SelectItem>
                          <SelectItem value="acsr-1272">ACSR 1272 kcmil</SelectItem>
                          <SelectItem value="opgw">OPGW Ground Wire</SelectItem>
                          <SelectItem value="static">Static Wire</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="1.5"
                        step="0.1"
                        value={conductor.weight}
                        onChange={(e) =>
                          updateConductor(conductor.id, "weight", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="1.2"
                        step="0.1"
                        value={conductor.diameter}
                        onChange={(e) =>
                          updateConductor(conductor.id, "diameter", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="15000"
                        value={conductor.tension}
                        onChange={(e) =>
                          updateConductor(conductor.id, "tension", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="25"
                        value={conductor.hardwareWeight}
                        onChange={(e) =>
                          updateConductor(
                            conductor.id,
                            "hardwareWeight",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {conductors.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeConductor(conductor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conductor Arrangement</CardTitle>
            <CardDescription>
              Spatial configuration of conductors on the pole
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <p className="text-muted-foreground">Conductor arrangement diagram</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Load Summary</CardTitle>
            <CardDescription>
              Calculated conductor loads for design
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-sm font-medium">Total Weight</span>
                <span className="text-lg font-semibold text-primary">
                  {conductors.reduce((sum, c) => sum + (parseFloat(c.weight) || 0), 0).toFixed(1)} lbs/ft
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-sm font-medium">Max Tension</span>
                <span className="text-lg font-semibold text-primary">
                  {Math.max(...conductors.map(c => parseFloat(c.tension) || 0)).toLocaleString()} lbs
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="text-sm font-medium">Hardware Weight</span>
                <span className="text-lg font-semibold text-primary">
                  {conductors.reduce((sum, c) => sum + (parseFloat(c.hardwareWeight) || 0), 0)} lbs
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/geometry")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/loads")}>
          Next: Load Calculations
        </Button>
      </div>
    </div>
  );
}