"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsGridSection from "@/features/analytics/components/section/AnalyticsGridSection";

export default function AnalyticsTabsSection() {
  return (
    <Tabs defaultValue="mes" className="w-full">
      <TabsList>
        <TabsTrigger value="mes">Mes</TabsTrigger>
        <TabsTrigger value="trimestre">Trimestre</TabsTrigger>
        <TabsTrigger value="anio">Año</TabsTrigger>
      </TabsList>
      <TabsContent value="mes" className="mt-4">
        <AnalyticsGridSection period="mes" />
      </TabsContent>
      <TabsContent value="trimestre" className="mt-4">
        <AnalyticsGridSection period="trimestre" />
      </TabsContent>
      <TabsContent value="anio" className="mt-4">
        <AnalyticsGridSection period="anio" />
      </TabsContent>
    </Tabs>
  );
}

