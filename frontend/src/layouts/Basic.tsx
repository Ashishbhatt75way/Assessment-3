import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

function Basic() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="navbar p-5 w-full text-slate-300 border-b-[1px] fixed z-[100] border-[#fff]/20">
        <div className="flex items-center justify-between mx-auto px-20">
          <div>URL</div>

          <div className="flex gap-10 items-center font-medium tracking-wide leading-6 pl-44">
            <NavLink
              to={"/"}
              className="relative after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-[#dbff6f]  after:content-[''] after:transition-all after:duration-[0.3] hover:after:w-full hover:text-[#dbff6e]"
            >
              Home
            </NavLink>
            <NavLink
              to={"/qr"}
              className="relative after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-[#dbff6f]  after:content-[''] after:transition-all after:duration-[0.3] hover:after:w-full hover:text-[#dbff6e]"
            >
              Generate QR
            </NavLink>
          </div>

          <div className="flex gap-4">
            <button
              className="text-white bg-neutral-800 rounded-full px-8 py-2"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>

            <button
              className="text-white bg-neutral-800 rounded-full px-8 py-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Basic;
