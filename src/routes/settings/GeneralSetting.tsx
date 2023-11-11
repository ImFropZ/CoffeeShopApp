import {
  PermissionDataTable,
  permissionColumns,
} from "@/components/permission";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function GeneralSetting() {
  return (
    <div className="p-2">
      <div className="my-2 flex items-center">
        <Label className="text-xl">Permissions</Label>
        <Button variant="outline" className="ml-auto">
          Add
        </Button>
      </div>
      <div className="relative h-[320px]">
        <PermissionDataTable
          columns={permissionColumns}
          data={Array.from({ length: 10 }).map((_) => {
            return {
              id: "1",
              name: "Admin",
              description: "Access to all data",
            };
          })}
        />
      </div>
    </div>
  );
}

export default GeneralSetting;
