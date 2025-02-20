import * as React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";

export default function Authanticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutUser();
    navigate("/login");
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="navbar p-5 w-full bg-black text-slate-300 border-b-[1px] fixed z-[100] border-[#fff]/20">
        <div className="flex items-center justify-between mx-auto px-20">
          <button className="cursor-pointer" onClick={() => navigate("/")}>
            UrlShort
          </button>

          <div className="flex gap-10 items-center font-medium tracking-wide leading-6 pl-44">
            <NavLink
              to={"/"}
              className="relative after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-[#dbff6f]  after:content-[''] after:transition-all after:duration-[0.3] hover:after:w-full hover:text-[#dbff6e]"
            >
              Home
            </NavLink>
            <NavLink
              to={"/generate-qr"}
              className="relative after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-[#dbff6f]  after:content-[''] after:transition-all after:duration-[0.3] hover:after:w-full hover:text-[#dbff6e]"
            >
              Generate QR
            </NavLink>
            <NavLink
              to={"/admin-panel"}
              className="relative after:absolute after:w-0 after:h-0.5   after:-bottom-1 after:left-0 after:bg-[#dbff6f]  after:content-[''] after:transition-all after:duration-[0.3] hover:after:w-full hover:text-[#dbff6e]"
            >
              Admin Panel
            </NavLink>
          </div>

          <div className="flex gap-4">
            <button
              className="text-white bg-neutral-800 rounded-lg px-6 py-2"
              onClick={() => logoutHandler()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
