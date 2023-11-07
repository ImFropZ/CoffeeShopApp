import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  fullname: z
    .string()
    .min(5, {
      message: "Fullname must be at least 5 characters.",
    })
    .regex(/^[a-zA-Z]+ [a-zA-Z]+$/, {
      message: "Fullname must be in the format: Firstname Lastname.",
    }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  oldPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function ProfileSetting() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center gap-10 pt-10">
      <div className="flex flex-col items-center">
        <Avatar className="h-32 w-32">
          <AvatarImage
            src="https://github.com/imfropz.png"
            alt="Lim Tangmeng"
          />
          <AvatarFallback>Lim Tangmeng</AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold">Lim Tangmeng</h1>
        <p className="mt-2 text-gray-500">Role</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-8"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="Lim Tangmeng" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your login username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Old Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="ml-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProfileSetting;
