import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Link } from "react-router-dom";

export function PasswordResetDialogue({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Password Reset Request</DialogTitle>
          <DialogDescription>
            A password reset link has been sent to your email address. Please check your email and
            follow the instructions to reset your password.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Link to="https://www.gmail.com">
            <Button type="submit">Click Here</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
