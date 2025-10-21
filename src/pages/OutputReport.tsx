import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Download, Printer, Share } from "lucide-react";

export default function OutputReport() {
  const navigate = useNavigate();

  const projectSummary = {
    projectName: "Transmission Line Upgrade - Segment A",
    location: "Denver, Colorado",
    engineer: "John Smith, P.E.",
    date: "2024-01-15",
    poleType: "Single Pole",
    status: "Design Complete"
  };

  const designSummary = [
    { item: "Pole Height", value: "80 ft" },
    { item: "Base Diameter", value: "24 inches" },
    { item: "Top Diameter", value: "12 inches" },
    { item: "Wall Thickness", value: "0.25 inches" },
    { item: "Material", value: "ASTM A572 Grade 50" },
    { item: "Wind Speed", value: "110 mph" },
    { item: "Ice Thickness", value: "0.5 inches" },
  ];

  const checkResults = [
    { check: "Axial Compression", ratio: 0.63, status: "pass" },
    { check: "Bending Moment", ratio: 0.77, status: "pass" },
    { check: "Shear Force", ratio: 0.40, status: "pass" },
    { check: "Combined Stress", ratio: 0.89, status: "pass" },
    { check: "Deflection", ratio: 0.58, status: "pass" },
    { check: "Connection", ratio: 0.95, status: "warn" },
    { check: "Foundation", ratio: 0.73, status: "pass" },
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
        <h2 className="text-3xl font-bold text-foreground">Design Report</h2>
        <p className="text-muted-foreground">
          Complete design documentation and analysis summary for the steel transmission pole.
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Export Excel
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print Report
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          Share
        </Button>
      </div>

      <div className="bg-card border rounded-lg p-8 space-y-8">
        {/* Report Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Steel Transmission Pole Design Report</h1>
          <p className="text-muted-foreground">
            Design according to ASCE/SEI 48-19 Standard
          </p>
          <div className="text-sm text-muted-foreground">
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>

        <Separator />

        {/* Project Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(projectSummary).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Design Parameters */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Design Parameters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {designSummary.slice(0, 4).map((item) => (
                <div key={item.item} className="flex justify-between">
                  <span className="text-muted-foreground">{item.item}:</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {designSummary.slice(4).map((item) => (
                <div key={item.item} className="flex justify-between">
                  <span className="text-muted-foreground">{item.item}:</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Design Check Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Design Check Summary</h2>
          <div className="space-y-3">
            {checkResults.map((result) => (
              <div key={result.check} className="flex items-center justify-between p-3 bg-muted rounded">
                <span className="font-medium">{result.check}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    Utilization: {(result.ratio * 100).toFixed(0)}%
                  </span>
                  <Badge variant={getStatusColor(result.status)}>
                    {result.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Design Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Design Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium">Critical Load Case</h3>
              <div className="bg-muted p-3 rounded">
                <div className="font-medium">1.2D + 1.0BW</div>
                <div className="text-sm text-muted-foreground">
                  Maximum factored load: 17.9 kips
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium">Overall Status</h3>
              <div className="bg-success/10 border border-success p-3 rounded">
                <div className="font-medium text-success">Design Acceptable</div>
                <div className="text-sm text-muted-foreground">
                  All design checks pass per ASCE 48-19
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommendations</h2>
          <div className="space-y-2 text-sm">
            <p>• The designed steel transmission pole meets all ASCE/SEI 48-19 requirements.</p>
            <p>• Anchor rod tension utilization is at 95% - consider upgrading to next size if field conditions vary.</p>
            <p>• Regular inspection intervals should be established per IEEE standards.</p>
            <p>• Foundation concrete strength should be verified during construction.</p>
          </div>
        </div>

        <Separator />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>This report was generated using Steel Pole Designer software.</p>
          <p>Design calculations conform to ASCE/SEI 48-19 standards.</p>
          <p>Report generated by: {projectSummary.engineer}</p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate("/connections")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={() => navigate("/")}>
          New Project
        </Button>
      </div>
    </div>
  );
}