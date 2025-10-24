import { Link } from "react-router-dom";
import { PencilLine } from "lucide-react";

const Write_content = () => {
  return (
    <>
      <div>
        <Link to="/blog/new" className="flex gap-2 items-center">
          <PencilLine size={21} />

          <span className="hidden sm:block">Write</span>
        </Link>
      </div>
    </>
  );
};

export default Write_content;
