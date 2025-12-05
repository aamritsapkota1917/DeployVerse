import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TagsInput } from "react-tag-input-component";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { publishBlog } from "@/api/blogs";

export function PostDialogue({ open, setOpen }) {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setOpen(false);
      await publishBlog(selected);
      navigate("/");
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] sm:min-h-[300px]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="mb-2">Enter a topics to select</DialogTitle>
          <DialogDescription>
            Please select topics of your interest to personalize your experience.
            <p className="mt-5">
              <TagsInput value={selected} onChange={setSelected} placeHolder="enter tags here" />
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
