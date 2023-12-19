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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateProfile } from "@/redux";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  fullName: z
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
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .optional(),
  newPassword: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .optional(),
});

function ProfileSetting() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState<File>();
  const { fullName, username, email, role, picture } = useAppSelector(
    (state) => state.user,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: fullName,
      username: username,
      email: email || undefined,
      oldPassword: undefined,
      newPassword: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    if (values.fullName) formData.append("fullName", values.fullName);
    if (values.username) formData.append("username", values.username);
    if (values.email) formData.append("email", values.email);
    if (values.oldPassword) formData.append("oldPassword", values.oldPassword);
    if (values.newPassword) formData.append("newPassword", values.newPassword);
    if (image) formData.append("image", image);

    if (image) console.log(new Blob([image], { type: image.type }));

    dispatch(updateProfile(formData)).then(() => {
      form.setValue("oldPassword", "");
      form.setValue("newPassword", "");
    });
    setImage(undefined);
  }

  return (
    <div className="flex justify-center gap-10 pt-10">
      <div className="flex flex-col items-center">
        <Avatar className="relative h-32 w-32">
          <AvatarImage
            src={
              image
                ? URL.createObjectURL(new Blob([image], { type: image.type }))
                : picture.url
            }
            alt={fullName}
          />
          <AvatarFallback>{fullName}</AvatarFallback>
          <input
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            title="Change profile picture"
            accept="image/*"
            onChange={(event) => {
              const file = (event.target as HTMLInputElement).files?.[0];
              if (file) {
                // Check if file is an image
                if (!file.type.startsWith("image/")) {
                  console.log("File must be an image.");
                  return;
                }

                // Check if file is larger than 5MB
                if (file.size > 5 * 1024 * 1024) {
                  console.log("File must be smaller than 5MB.");
                  return;
                }

                setImage(file);
              }
            }}
          />
        </Avatar>
        <h1 className="mt-4 text-2xl font-bold">{fullName}</h1>
        <p className="mt-2 text-gray-500">{role}</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid h-fit grid-cols-2 gap-3"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="h-fit">
                <FormLabel className="font-bold">Full Name</FormLabel>
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
          <Button
            className="col-span-2 underline"
            variant={"outline"}
            onClick={() => navigate({ pathname: "/forgot-password" })}
          >
            Forgot Password ?
          </Button>
          <Button type="submit" className="col-span-2">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ProfileSetting;
