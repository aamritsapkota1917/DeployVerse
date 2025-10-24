import { BlogCard } from "@/components/blog/card";
import Navbar from "@/components/navbar";
import datas from "./data.json";
import Sidebar from "./sidebar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex  relative overflow-y-auto">
        <div className="md:w-2/3  ">
          {datas.map((data) => {
            return <BlogCard data={data} />;
          })}
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
