import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button"

import { Toggle_theme } from "@/components/ui/toggle_theme";
import useUser from "@/hooks/useUser";

import Dashboard from "./dashboard";

const Homepage = () => {

  const { isLoading, data,error } = useUser();
  
  // if (isLoading)
  // {
  //   return <h1>loading..</h1>
  // }
 


  // if (data && !error)
  // {
  // }
  return <Dashboard/>
 


  return (
      <>
          
        <header className="flex  justify-around h-16 px-4 md:px-6 bg-background border-b">

        <Link to="/" className="flex items-center gap-2" >
         <p className=" hidden text-3xl font-bold md:block">DeployVerse</p>
          
          </Link>

      <div className="flex  gap-8 items-center  ">
          
          <Toggle_theme/>
      

        <Link to="/login" >Write</Link>
        <Link to="/login" >Sign in</Link>

          <Link to="/signup">
          <Button> Get started </Button>
          </Link>
          
        </div>

        
     </header>
    </>
  )
};


export default Homepage


