import { ChartInteractive } from "@/components/custom/ChartInteractive";
import { DataTable, schema } from "@/components/custom/DataTables";
import { SectionCards } from "@/components/custom/SectionCard";
import rawData from "@/mock/mock.data.overview.json";

import { z } from "zod";

const data = rawData as z.infer<typeof schema>[];

export default function OverviewPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
