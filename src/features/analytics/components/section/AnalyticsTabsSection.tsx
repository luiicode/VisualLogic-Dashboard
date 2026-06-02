"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsWrapper from "@/features/analytics/components/wrapper/AnalyticsWrapper";

export default function AnalyticsTabsSection() {
  return (
    <Tabs defaultValue="mes" className="w-full">
      <TabsList>
        <TabsTrigger value="mes">Mes</TabsTrigger>
        <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
        <TabsTrigger value="anio">Año</TabsTrigger>
      </TabsList>
      <TabsContent value="mes" className="mt-4">
        <AnalyticsWrapper period="mes" />
      </TabsContent>
      <TabsContent value="trimestre" className="mt-4">
        <AnalyticsWrapper period="trimestre" />
      </TabsContent>
      <TabsContent value="anio" className="mt-4">
        <AnalyticsWrapper period="anio" />
      </TabsContent>
    </Tabs>
  );
}
