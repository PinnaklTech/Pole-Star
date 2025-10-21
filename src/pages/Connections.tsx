import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";

export default function Connections() {
  const navigate = useNavigate();
  const [connectionType, setConnectionType] = useState("");
  const [foundationType, setFoundationType] = useState("");

  const connectionChecks = [
    { item: "Bolt Strength", status: "pass", value: "185 kips", capacity: "240 kips" },
    { item: "Bolt Bearing", status: "pass", value: "165 kips", capacity: "200 kips" },
    { item: "Base Plate Bending", status: "pass", value: "145 kip-ft", capacity: "180 kip-ft" },
    { item: "Anchor Rod Tension", status: "warn", value: "95 kips", capacity: "100 kips" },
  ];

  const foundationChecks = [
    { item: "Concrete Compression", status: "pass", value: "1.8 ksi", capacity: "3.0 ksi" },
    { item: "Pullout Resistance", status: "pass", value: "425 kips", capacity: "580 kips" },
    { item: "Shear Friction", status: "pass", value: "85 kips", capacity: "120 kips" },
    { item: "Foundation Overturning", status: "pass", value: "1.8", capacity: "2.0" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass": return "default";
      case "warn": return "secondary";
      case "fail": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Connections & Foundations</h2>
        <p className="text-muted-foreground">
          Design and verify connection details and foundation systems for the transmission pole.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Connection Configuration
            </CardTitle>
            <CardDescription>
              Select connection type and foundation system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Connection Type</label>
              <Select onValueChange={setConnectionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bolted">Bolted Base Plate</SelectItem>
                  <SelectItem value="welded">Welded Connection</SelectItem>
                  <SelectItem value="pinned">Pinned Base</SelectItem>
                  <SelectItem value="socket">Socket Connection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Foundation Type</label>
              <Select onValueChange={setFoundationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select foundation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anchor-bolts">Anchor Bolt Foundation</SelectItem>
                  <SelectItem value="direct-embed">Direct Embed</SelectItem>
                  <SelectItem value="casing">Steel Casing</SelectItem>
                  <SelectItem value="drilled-shaft">Drilled Shaft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {connectionType && foundationType && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Selected Configuration</h4>
                <div className="space-y-1 text-sm">
                  <div>Connection: <span className="font-medium">{connectionType}</span></div>
                  <div>Foundation: <span className="font-medium">{foundationType}</span></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Details</CardTitle>
            <CardDescription>
              3D view of connection geometry and components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">3D Connection Detail</p>
                <p className="text-sm text-muted-foreground">
                  Interactive assembly visualization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connection Checks</CardTitle>
            <CardDescription>
              Verification of connection component capacities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Check Item</TableHead>
                  <TableHead>Demand</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectionChecks.map((check, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{check.item}</TableCell>
                    <TableCell>{check.value}</TableCell>
                    <TableCell>{check.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(check.status)}>
                        {check.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Foundation Checks</CardTitle>
            <CardDescription>
              Verification of foundation capacity and stability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Check Item</TableHead>
                  <TableHead>Demand</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {foundationChecks.map((check, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{check.item}</TableCell>
                    <TableCell>{check.value}</TableCell>
                    <TableCell>{check.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(check.status)}>
                        {check.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Foundation Layout</CardTitle>
          <CardDescription>
            Plan view showing foundation dimensions and reinforcement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Foundation Plan View</p>
              <p className="text-sm text-muted-foreground">
                Detailed reinforcement layout and dimensions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/serviceability")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/report")}>
          Next: Output Report
        </Button>
      </div>
    </div>
  );
}