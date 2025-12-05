import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Toggle_theme } from "@/components/ui/toggle_theme";
import useUser from "@/hooks/useUser";
import { useBlogs } from "@/hooks/useBlog";

import Dashboard from "./dashboard";

import { BlogCard } from "@/components/blog/card";

const Homepage = () => {
  const { isLoading, data, error } = useUser();
  const { data: blogsData, error: blogsError, isLoading: blogsLoading } = useBlogs();

  // if (isLoading)
  // {
  //   return <h1>loading..</h1>
  // }

  if (data && !error) {
    return <Dashboard />;
  }

  return (
    <>
      <header className="flex justify-between h-16 px-4 md:px-6 bg-background border-b">
        <Link to="/" className="flex items-center gap-2">
          <p className=" hidden text-3xl font-bold md:block">DeployVerse</p>
        </Link>

        <div className="flex  gap-8 items-center  ">
          <Toggle_theme />

          <Link to="/login">Write</Link>
          <Link to="/login">Sign in</Link>

          <Link to="/signup">
            <Button> Get started </Button>
          </Link>
        </div>
      </header>
      <div className="flex  relative overflow-y-auto">
        <div className="md:w-2/3  ">
          {blogsData?.blogs.map((data) => {
            return <BlogCard data={data} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Homepage;
