import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import axios from "axios";

import { useForm } from "react-hook-form";

import { useState } from "react";

import { signinSchema } from "@/schema/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { VerificationPage } from "@/components/form/verification_page_dialogue";

import { googleApi } from "@/api/signup";

import LoadingButton from "@/components/ui/LoadingButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/form/PasswordInput";

export function LoginForm() {
  const [displayVerify, setDisplayVerify] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    mode: "all",
    resolver: zodResolver(signinSchema),
  });

  const login = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", data);
      // console.log(res?.data?.isUnVerified);
      if (res?.data?.isUnVerified) {
        console.log(res);
        // navigate("/")
        // return <VerificationPage/>
        setDisplayVerify(true);
      } else {
        navigate("/");
      }
    } catch (error) {
      const err = error.response?.data?.msg;
      console.log(error);
      form.setError("root", {
        message: err,
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <Card className="mx-auto max-w-sm mt-10 ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              <form onSubmit={form.handleSubmit(login)}>
                {form.formState.errors.root && (
                  <p className="text-destructive mb-5 ">{form.formState.errors.root.message} </p>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-2 ">
                  <div className="flex items-center ">
                    <Link to="/forget_password" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-5">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <LoadingButton
                  loading={form.formState.isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Log in
                </LoadingButton>
              </form>

              <Button onClick={googleApi} variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        <VerificationPage open={displayVerify} setOpen={setDisplayVerify} />
      </Form>
    </>
  );
}
