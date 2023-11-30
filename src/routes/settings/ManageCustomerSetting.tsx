import { CustomerDataTable, customerColumns } from "@/components/customer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { initCustomers } from "@/redux";

function ManageCustomerSetting() {
  const dispatch = useAppDispatch();
  const customers = useAppSelector((state) => state.customers.data);

  useEffect(() => {
    dispatch(initCustomers());
  }, []);

  return (
    <div>
      <CustomerDataTable columns={customerColumns} data={customers} />
    </div>
  );
}

export default ManageCustomerSetting;
