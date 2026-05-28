import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">{label}</div>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight">
          {value}
        </div>
        <div className="mt-1 text-xs text-emerald-600">{delta}</div>
      </CardContent>
    </Card>
  );
}
