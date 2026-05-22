import { DataTable, schema } from "@/components/custom/DataTables";
import rawData from "@/mock/mock.data.overview.json";

import { z } from "zod";

const data = rawData as z.infer<typeof schema>[];
export default function DataExplorerPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DataTable data={data} />
    </div>
  );
}
