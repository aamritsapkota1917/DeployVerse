import Editor from "@/components/blog/Editor";
import { Button } from "@/components/ui/button";
import PublishNavbar from "@/components/publish_navbar";

const Write_blog = () => {
  return (
    <>
      <PublishNavbar />
      <div className="max-w-3xl mx-auto ">
        <Editor />
      </div>
    </>
  );
};

export default Write_blog;
