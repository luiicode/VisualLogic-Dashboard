import { DataTable, schema } from "@/components/custom/DataTables";
import rawData from "@/mock/mock.data.overview.json";

import { z } from "zod";
import { SectionCharts } from "./_components/SectionCharts";

const data = rawData as z.infer<typeof schema>[];

export default function TicketsPage() {
  return (
    <div className="flex flex-1 flex-col gap-16">
      <SectionCharts />
      <DataTable data={data} />
    </div>
  );
}
