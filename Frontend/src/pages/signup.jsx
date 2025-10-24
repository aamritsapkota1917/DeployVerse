import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/schema/signup";
import { useState } from "react";

import axios from "axios";
import { googleApi } from "@/api/signup";
import { VerificationPage } from "../components/form/verification_page_dialogue";
import { Link } from "react-router-dom";

import LoadingButton from "@/components/ui/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { Input } from "@/components/ui/input";

export function SignupForm() {
  const [open, setOpen] = useState(false);

  const signup = async (data) => {
    try {
      const res = await axios.post("/api/auth/register", data);

      if (res?.status == 200) {
        setOpen(true);
        form.resetField();
      }
      form.resetField();
    } catch (error) {
      console.log(error.response.data.message);
      const err = error.response.data.message;
      form.setError("root", {
        message: err,
      });
    }
  };

  const form = useForm({
    mode: "all",
    resolver: zodResolver(signupSchema),
  });

  return (
    <>
      <Form {...form}>
        <Card className="mx-auto max-w-md mt-10">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <form onSubmit={form.handleSubmit(signup)}>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                {/* <Password /> */}

                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <p className="text-destructive text-center">
                    {form.formState.errors.root.message}{" "}
                  </p>
                )}

                <LoadingButton
                  loading={form.formState.isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  Create an account
                </LoadingButton>
              </form>
              <Button onClick={googleApi} variant="outline" className="w-full">
                Sign up with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
        <VerificationPage open={open} setOpen={setOpen} />
      </Form>
    </>
  );
}
