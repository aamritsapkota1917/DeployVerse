import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Recommended_topics = () => {
  return (
    <>
      <div className="max-w-xs">
        <h3 className="text-lg font-medium mb-4">Recommended Topics</h3>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4  ">
          <Link href="#" className="max-w-fit">
            <Button variant="tag" size="tag">
              Technology
            </Button>
          </Link>

          <Link href="#" className="max-w-fit">
            <Button variant="tag" size="tag">
              Design
            </Button>
          </Link>

          <Link href="#" className="max-w-fit">
            <Button variant="tag" size="tag">
              Business
            </Button>
          </Link>

          <Link href="#" className="max-w-fit">
            <Button variant="tag" size="tag">
              Lifestyle
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
