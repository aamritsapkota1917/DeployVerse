import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Link } from "react-router-dom"


export function VerificationPage({open,setOpen}) {
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Your account needs verification
          </DialogTitle>
          <DialogDescription>
             verification mail has been sent to your mail.
                      please visit mail and verify your acoount
          </DialogDescription>
        </DialogHeader>
     
        <DialogFooter>
          <Link to="https://www.gmail.com">
          <Button type="submit">Click Here</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
