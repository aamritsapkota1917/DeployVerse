import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import { Spinner } from "flowbite-react";
import { ClipLoader } from "react-spinners";

export const SubmitButton = ({ info }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <ClipLoader size="20" />
          </div>
        ) : (
          <span>{info}</span>
        )}
      </Button>
    </>
  );
};
