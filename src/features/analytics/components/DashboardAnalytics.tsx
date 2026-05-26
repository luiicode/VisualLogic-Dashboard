import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsView from "@/features/analytics/components/AnalyticsView";

export default function DashboardAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Métricas de desempeño, cumplimiento y operación del equipo
        </p>
      </div>
      <Tabs defaultValue="mes" className="w-full">
        <TabsList>
          <TabsTrigger value="mes">Mes</TabsTrigger>
          <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
          <TabsTrigger value="anio">Año</TabsTrigger>
        </TabsList>
        <TabsContent value="mes" className="mt-4">
          <AnalyticsView period="mes" />
        </TabsContent>
        <TabsContent value="trimestre" className="mt-4">
          <AnalyticsView period="trimestre" />
        </TabsContent>
        <TabsContent value="anio" className="mt-4">
          <AnalyticsView period="anio" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
