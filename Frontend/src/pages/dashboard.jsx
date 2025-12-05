import { BlogCard } from "@/components/blog/card";
import Navbar from "@/components/navbar";
import datas from "./data.json";
import Sidebar from "./sidebar";
import { useBlogs } from "@/hooks/useBlog";

const Dashboard = () => {
  const { data, isLoading, error } = useBlogs();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading blogs: {error.message}</div>;
  }

  console.log(data);

  return (
    <>
      <Navbar />
      <div className="flex  relative overflow-y-auto">
        <div className="md:w-2/3  ">
          {data?.blogs.map((data) => {
            return <BlogCard data={data} />;
          })}
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
