import { CustomerDataTable, customerColumns } from "@/components/customer";

function ManageCustomerSetting() {
  return (
    <div>
      <CustomerDataTable columns={customerColumns} data={[]} />
    </div>
  );
}

export default ManageCustomerSetting;
