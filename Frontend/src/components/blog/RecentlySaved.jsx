import { Link } from "react-router-dom";

export const RecentlySaved = () => {
  return (
    <div className="">
      <h3 className="text-lg font-medium mb-4">Recently Saved</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg"
            alt="Article thumbnail"
            width={64}
            height={64}
            className="rounded-md"
          />
          <div>
            <Link href="#" className="text-sm font-medium hover:underline">
              The Future of AI in Healthcare
            </Link>
            <p className="text-sm text-muted-foreground">By John Doe • 2 days ago</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg"
            alt="Article thumbnail"
            width={64}
            height={64}
            className="rounded-md"
          />
          <div>
            <Link href="#" className="text-sm font-medium hover:underline">
              Designing for Accessibility
            </Link>
            <p className="text-sm text-muted-foreground">By Jane Appleseed • 1 week ago</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg"
            alt="Article thumbnail"
            width={64}
            height={64}
            className="rounded-md"
          />

          <div>
            <Link href="#" className="text-sm font-medium hover:underline">
              The Rise of Remote Work
            </Link>
            <p className="text-sm text-muted-foreground">By Sarah Myles • 3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};
