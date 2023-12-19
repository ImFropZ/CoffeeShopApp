import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPassword, verifyToken } from "@/lib/axios/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function VerifyCode() {
  const navigate = useNavigate();
  const [params, _] = useSearchParams();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  if (!params.has("login")) {
    navigate(-1);
    return null;
  }

  const refreshToken = useMutation({
    mutationKey: ["refresh-token"],
    mutationFn: () => forgotPassword(params.get("login") || ""),
  });

  const { mutate } = useMutation({
    mutationKey: ["verify-code"],
    mutationFn: () =>
      verifyToken({
        data: params.get("login") || "",
        newPassword: password,
        token,
      }),
    onSuccess() {
      navigate("/");
    },
  });

  const onVerify = () => {
    if (token.length !== 6) return;
    if (password.length < 6) return;

    mutate();
  };

  return (
    <div className="relative mx-auto mt-10 flex w-[36rem] flex-col items-center rounded-xl border-2 border-slate-400 p-10">
      <h1 className="text-2xl font-bold underline">Verify and New password</h1>
      <p className="text-gray-500">
        Enter your token from email and new password.
      </p>
      <div className="my-2 grid w-full grid-cols-2 gap-2">
        <Input
          placeholder="Your Token"
          value={token}
          onChange={(e) =>
            e.currentTarget.value.length < 7
              ? setToken(e.currentTarget.value)
              : null
          }
        ></Input>
        <Input
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></Input>
      </div>
      <div className="flex w-full justify-end gap-2">
        <Button
          variant={"outline"}
          onClick={(e) => {
            refreshToken.mutate();
            const currentTarget = e.currentTarget;
            currentTarget.disabled = true;
            setTimeout(() => {
              currentTarget.disabled = false;
            }, 60 * 1000); // 1 min cooldown
          }}
        >
          Send again
        </Button>
        <Button onClick={onVerify}>Verify</Button>
      </div>
    </div>
  );
}

export default VerifyCode;
