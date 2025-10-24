import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { useForm, FormProvider } from "react-hook-form";
import { forgetPasswordSchema } from "@/schema/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Email } from "@/components/form/Email";

import { useState } from "react";
import { PasswordResetDialogue } from "@/components/form/passwordReset_dialogue";
// import { SubmitButton } from "@/components/form/SubmitButton";

export const Forget_Password = () => {
  const [open, setOpen] = useState(false);

  const methods = useForm({
    mode: "all",
    resolver: zodResolver(forgetPasswordSchema),
  });

  const forgetPassword = async (data) => {
    try {
      const res = await axios.post("api/user/forgot-password", data);
      if (res.status == 200) {
        setOpen(true);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      const err = error?.response?.data?.msg;
      methods.setError("root", {
        message: err,
      });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Card className="mx-auto max-w-sm mt-20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold mb-2">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address below and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={methods.handleSubmit(forgetPassword)}>
              <Email />
              {methods.formState.errors && (
                <p className="text-red-500 text-center  ">
                  {methods.formState?.errors?.root?.message}
                </p>
              )}
              <SubmitButton info="Reset Password" />
            </form>
          </CardContent>
        </Card>
      </FormProvider>
      <PasswordResetDialogue open={open} setOpen={setOpen} />
    </>
  );
};
