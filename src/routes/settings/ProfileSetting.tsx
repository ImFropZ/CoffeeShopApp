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
import { useAppSelector } from "@/hooks/redux";
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
    })
    .optional(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email." }).optional(),
  oldPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .optional(),
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .optional(),
});

function ProfileSetting() {
  const { username, email, role } = useAppSelector((state) => state.user);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: undefined,
      username: username,
      email: email || undefined,
      oldPassword: undefined,
      newPassword: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center gap-10 pt-10">
      <div className="flex flex-col items-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src="https://github.com/imfropz.png" alt={username} />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold">{username}</h1>
        <p className="mt-2 text-gray-500">{role}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid h-fit grid-cols-2 gap-3"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="h-fit">
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
              <FormItem className="h-fit">
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
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 h-fit">
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder={email || "Your email"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="h-fit">
                <FormLabel className="font-bold">Old Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="h-fit">
                <FormLabel className="font-bold">New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileSetting;
