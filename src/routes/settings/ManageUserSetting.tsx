import { UserDataTable, userColumns } from "@/components/user";
import { getUsers } from "@/lib/axios/users";
import { useQuery } from "@tanstack/react-query";

function ManageUserSetting() {
  const users = useQuery({ queryKey: ["users"], queryFn: () => getUsers() });

  console.log(users);

  return (
    <div>
      <UserDataTable columns={userColumns} data={users.data ?? []} />
    </div>
  );
}

export default ManageUserSetting;
