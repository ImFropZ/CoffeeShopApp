import { StockDataTable, stockColumns } from "@/components/stock";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { initStocks } from "@/redux/stock";
import { useEffect } from "react";

function Stock() {
  const dispatch = useAppDispatch();
  const menus = useAppSelector((state) => state.stocks.data);

  useEffect(() => {
    dispatch(initStocks());
  }, []);

  return (
    <div className="relative h-full">
      <StockDataTable columns={stockColumns} data={menus} />
    </div>
  );
}

export default Stock;
