import { StockDataTable, stockColumns } from "@/components/stock";

function Stock() {
  const data = Array.from({ length: 100 }).map((_, index) => {
    return {
      id: index + "",
      name: `Stock ${index}`,
    };
  });

  return (
    <div className="relative h-full">
      <StockDataTable columns={stockColumns} data={data} />
    </div>
  );
}

export default Stock;
