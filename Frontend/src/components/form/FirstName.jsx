
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const FirstName = () => {
    const { register,formState:{errors} } = useFormContext()
  return (
    <div className="flex flex-col gap-2" >
       <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Rabindra"
                  {...register('firstName')}
                  variant={errors.firstName && 'error' }
                  />
                <p className="text-red-500">{errors.firstName?.message}</p>
    </div>
  )
};



