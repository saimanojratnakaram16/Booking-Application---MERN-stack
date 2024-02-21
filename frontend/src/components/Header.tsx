import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutBtn from "./SignOutBtn";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 px-2">
      <div className="container mx-auto flex flex-wrap justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booking.com</Link>
        </span>
        <span className="flex flex-wrap gap-2">
          {isLoggedIn ? (
            <>
              <Link className="text-white px-4 py-2 text-lg" to="/my-bookings/">My Bookings</Link>
              <Link className="text-white px-4 py-2 text-lg"  to="/add-hotel">Add Hotels</Link>
             <SignOutBtn/>
            </>
          ) : (
            <Link
              to="/signIn"
              className="flex items-center bg-white rounded-md text-blue-600 px-4 font-bold  hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
