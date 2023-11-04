import { StockDataTable, stockColumns } from "@/components/stock";

// Mock data
const data: any = [];
Array.from({ length: 1000 }).forEach((_, index) => {
  data.push({
    id: index,
    name: "Foo",
  });
});

function Stock() {
  return (
    <div className="relative h-full">
      <StockDataTable columns={stockColumns} data={data} />
    </div>
  );
}

export default Stock;
