import { UserDataTable, userColumns } from "@/components/user";

function ManageUserSetting() {
  return (
    <div>
      <UserDataTable columns={userColumns} data={[]} />
    </div>
  );
}

export default ManageUserSetting;
