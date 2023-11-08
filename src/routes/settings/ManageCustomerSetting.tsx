import {
  Customer,
  CustomerDataTable,
  customerColumns,
} from "@/components/customer";

const data: Customer[] = [];

Array.from({ length: 100 }).forEach((_, index) => {
  data.push({
    id: index + 1 + "",
    name: "Lim Tangmeng",
    phoneNumber: "0123456789",
  });
});

function ManageCustomerSetting() {
  return (
    <div>
      <CustomerDataTable columns={customerColumns} data={data} />
    </div>
  );
}

export default ManageCustomerSetting;
