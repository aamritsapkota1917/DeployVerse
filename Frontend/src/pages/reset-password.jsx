import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
// import { SubmitButton } from "@/components/form/SubmitButton";
// import { Password } from "@/components/form/Password";
import { ConfirmPassword } from "@/components/form/ConfirmPassword";
import { passwordResetSchema } from "@/schema/signup";

export default function Reset_password() {
  const params = useParams();

  const navigate = useNavigate();

  console.log(params.token);
  const methods = useForm({
    mode: "all",
    resolver: zodResolver(passwordResetSchema),
  });

  const resetPassword = async (data) => {
    try {
      const res = await axios.patch(`/api/user/reset-password/${params?.token}`, data);

      console.log(res);
      if (res.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className="mx-auto max-w-sm mt-16">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter a new password to reset your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={methods.handleSubmit(resetPassword)}>
            {/* <Password /> */}
            <ConfirmPassword />
            <SubmitButton info="Reset Password" />
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
