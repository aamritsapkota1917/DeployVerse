import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";

import { useState } from "react";

export const ConfirmPassword = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2 ">
      <Label htmlFor="confirm_password">Confirm Password</Label>
      <div className="relative">
        <Input
          id="confirm_password"
          type={showPassword ? "text" : "password"}
          {...register("confirm_password")}
          variant={errors.confirm_password && "error"}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
      </div>
      <p className="text-red-500 mb-2">{errors.confirm_password?.message}</p>
    </div>
  );
};
