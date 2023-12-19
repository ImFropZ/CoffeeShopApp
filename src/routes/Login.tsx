import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { login as authLogin } from "@/redux";
import { useAppDispatch } from "@/hooks/redux";
import { useNavigate, Link } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    dispatch(authLogin({ data: username, password })).then(() => {
      navigate("/");
    });
  }

  return (
    <div className="absolute inset-0 flex h-screen justify-center pt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            to="/forgot-password"
            className="my-2 inline-block w-full text-center text-stone-500 underline"
          >
            Forgot password?
          </Link>
          <div className="flex justify-end w-full">
            <Button type="submit" className="ml-auto w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
