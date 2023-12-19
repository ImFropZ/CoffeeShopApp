import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/axios/auth";

function ForgotPassword() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["forgot-password", value],
    mutationFn: (value: string) => forgotPassword(value),
    onSuccess() {
      setValue("");
      navigate(
        { pathname: "/verify-code", search: `login=${value}` },
        { replace: true },
      );
    },
    onError() {
      setError("Email or username not found.");
    },
  });

  const onSend = () => {
    mutate(value);
  };

  return (
    <div className="relative mx-auto mt-10 flex w-[36rem] flex-col items-center rounded-xl border-2 border-slate-400 p-10">
      <Link to="/" className="absolute left-2 top-2 flex items-center gap-2">
        <IoMdArrowRoundBack />
        Back to main menu
      </Link>
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <p className="text-center text-sm text-gray-600">
        Please enter your email or username to reset your password. <br />
        If you don't have an email attact to your account, please contact your
        administrator.
      </p>
      <div>
        <p className="text-red-500">{error}</p>
      </div>
      <div className="grid w-4/5 grid-cols-[auto,auto] place-items-center">
        <Input
          className="my-2"
          placeholder="Email or Username"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        ></Input>
        <Button
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            if (value === "") return;
            onSend();
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default ForgotPassword;
