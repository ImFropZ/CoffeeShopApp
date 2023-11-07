import { User, UserDataTable, userColumns } from "@/components/user";

const data: User[] = [];

Array.from({ length: 100 }).forEach((_, index) => {
  data.push({
    id: index + 1 + "",
    name: "Lim Tangmeng",
    permissions: ["admin", "contributor"],
    picture: "https://github.com/imfropz.png",
  });
});

function ManageUserSetting() {
  return (
    <div>
      <UserDataTable columns={userColumns} data={data} />
    </div>
  );
}

export default ManageUserSetting;
