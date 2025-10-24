import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <MediumIcon className="h-7 w-7" />
          <span className=" hidden text-2xl font-semibold md:block">Meduim</span>
        </Link>
      </div>
    </>
  );
};

export default Logo;

function MediumIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
