
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const LastName = () => {
    const { register,formState:{errors} } = useFormContext()
  return (
     <div className="flex flex-col gap-2">
          
      <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Adhikari"
                  {...register('lastName')}
                  variant={errors.lastName && 'error' }
                  />
                <p className="text-red-500">{errors.lastName?.message}</p>
         </div>
  )
};



