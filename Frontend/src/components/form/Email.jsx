import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const Email = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="rabi@gmail.com"
        {...register("email")}
        variant={errors.email && "error"}
      />
      <p className="text-red-500 mb-2">{errors.email?.message}</p>
    </div>
  );
};
