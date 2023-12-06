import { MenuDataTable, menuColumns } from "@/components/menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

function GeneralSetting() {
  return (
    <div className="p-2">
      <Dialog>
        <div>
          <h1 className="text-xl font-bold">Menus</h1>
          <p className="text-gray-500">
            Manage your menus and their categories.
          </p>

          <div className="mt-4">
            <DialogTrigger asChild>
              <Button className="mr-2">Manage</Button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <h1 className="font-bold">Menus</h1>
          </DialogHeader>
          <div className="h-[25rem]">
            <MenuDataTable columns={menuColumns} data={[{ name: "Example" }]} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GeneralSetting;
