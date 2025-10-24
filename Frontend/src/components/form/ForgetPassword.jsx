import { Link } from "react-router-dom";

export const ForgetPassword = () => {
  return (
    <>
      <div className="flex items-center ">
        <Link to="/forget_password" className="ml-auto inline-block text-sm underline">
          Forgot your password?
        </Link>
      </div>
    </>
  );
};
