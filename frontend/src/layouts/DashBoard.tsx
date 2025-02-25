import { dashboardSidebar } from "@/utils/dashboard-sidebar";
import { ChevronRight } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useMeQuery } from "../services/api";

const DashBoard = () => {
  const { data: user } = useMeQuery();

  return (
    <div className="w-full pt-20">
      <section className="w-[20%] flex flex-col  items-center h-screen p-5 gap-3 fixed border-r-[.5px] border-[#fff]/20">
        <div className="flex flex-col  gap-10 w-full items-center mt-6">
          <div>
            <h1 className="text-4xl text-white font-bold">Dashboard</h1>
          </div>
          <div className="flex flex-col gap-2 w-5/6 text-sm justify-center mt-8">
            <div>
              {dashboardSidebar.map((item) => (
                <div
                  key={item.name}
                  className={`p-4 rounded-2xl justify-between text-[#a1a1aa] flex items-center gap-5 cursor-pointer hover:bg-[#dbff6f] hover:text-black transition-all duration-300 ease-in-out`}
                >
                  <item.icon size={20} />
                  <NavLink to={item.path}>{item.name}</NavLink>
                  <ChevronRight size={20} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-5/6 mt-8">
            <div className="flex items-center gap-5 justify-start">
              <div className="rounded-[100%] w-[50px] text-white text-3xl flex items-center justify-center border h-[50px]">
                <h3>{user?.data.name[0]}</h3>
              </div>
              <div>
                <h2 className="font-bold text-xl text-[#dbff6e]">
                  {user?.data.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
