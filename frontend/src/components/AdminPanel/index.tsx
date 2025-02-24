"use client";

import {
  ChevronRight,
  Contact2Icon,
  DollarSign,
  HelpCircle,
  LayoutDashboard,
  ListOrdered,
  PackageSearch,
  TicketPercent,
  UsersRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import UrlTable from "../UrlTable";
import { useGetShortUrlsQuery } from "../../services/urlApi";
import { useMeQuery } from "../../services/api";

const Page = () => {
  const { data } = useGetShortUrlsQuery();
  const { data: user } = useMeQuery();

  return (
    <div className="w-full bg-black pt-[80px]">
      <section className="w-[20%] flex flex-col bg-black items-center h-screen p-5 gap-3 fixed border-r-[.5px] border-[#fff]/20">
        <div className="flex flex-col bg-black gap-10 w-full items-center mt-6">
          <div>
            <h1 className="text-4xl text-white bg-black font-bold">
              URL Analytics
            </h1>
          </div>

          <div className="flex flex-col gap-2 w-5/6 text-sm justify-center mt-8">
            <div>
              <div className="p-4 rounded-2xl justify-between text-[#a1a1aa] flex items-center gap-5 cursor-pointer hover:bg-[#dbff6f] hover:text-black transition-all">
                <LayoutDashboard size={20} />
                <NavLink to="/panel">Dashboard</NavLink>
                <ChevronRight size={20} />
              </div>
              <div className="p-4 rounded-2xl justify-between text-[#a1a1aa] flex items-center gap-5 cursor-pointer hover:bg-[#dbff6f]/95 hover:text-black transition-all ">
                <PackageSearch size={20} />
                <NavLink to="/panel">Products</NavLink>
                <ChevronRight size={20} />
              </div>
              <div className="p-4 rounded-2xl justify-between text-[#a1a1aa] flex items-center gap-5 cursor-pointer hover:bg-[#dbff6f]/95 hover:text-black transition-all ">
                <Contact2Icon size={20} />
                <NavLink to="/panel">Customers</NavLink>
                <ChevronRight size={20} />
              </div>
              <div className=" p-5 rounded-2xl justify-between text-[#a1a1aa] flex items-center gap-5 cursor-pointer hover:bg-[#dbff6f]/95 hover:text-black transition-all ">
                <DollarSign size={20} />
                <NavLink to="/panel">Earnings</NavLink>
                <ChevronRight size={20} />
              </div>
              <div className=" p-5 rounded-2xl justify-between text-[#a1a1aa] flex items-center gap-5 cursor-pointer hover:bg-[#dbff6f]/95 hover:text-black transition-all ">
                <TicketPercent size={20} />
                <NavLink to="/panel">Offers</NavLink>
                <ChevronRight size={20} />
              </div>
              <div className=" p-4 rounded-2xl justify-between text-[#a1a1aa] flex items-center gap-5 cursor-pointer hover:bg-[#dbff6f]/95 hover:text-black  transition-all">
                <HelpCircle size={20} />
                <NavLink to="/panel">Help</NavLink>
                <ChevronRight size={20} />
              </div>
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

      <div className="w-[80%] h-full bg-black absolute right-0">
        <div className="w-full h-full bg-black flex flex-col">
          <div className="p-10 flex items-center bg-black justify-between gap-5">
            <div className="flex items-center justify-center">
              <h2 className="text-4xl font-bold">
                Hi.{" "}
                <span className="text-[#dbff6e]">
                  Hello, {user?.data.name} 👋
                </span>
                ,
              </h2>
            </div>
          </div>

          <div className="w-full flex h-full bg-black pt-3 gap-2 items-center flex-col">
            <div className="w-[90%] h-32 flex rounded-xl bg-neutral-200/15 py-8">
              <div className="w-1/2 h-full flex items-center justify-center border-r-[1px] border-[#a1a1aa]/20">
                <div className="w-[70px] h-[70px] flex items-center justify-center  border-gray-300 border-2 rounded-[100%]">
                  <UsersRound size={26} className="text-green-500" />
                </div>
                <div className="flex flex-col gap-1  ml-4">
                  <h2 className="font-light text-[#a1a1aa]">
                    Short Link Generated
                  </h2>
                  {data && (
                    <p className="font-bold text-3xl text-white">
                      {data.length ? data.length : 0}
                    </p>
                  )}
                </div>
              </div>

              <div className=" w-1/2 h-full flex items-center justify-center ">
                <div className="w-[70px] h-[70px] flex items-center justify-center  border-gray-300 border-2 rounded-[100%]">
                  <ListOrdered size={26} className="text-green-500" />
                </div>
                <div className="flex flex-col gap-1 ml-4">
                  <h2 className="font-light text-[#a1a1aa]">Active Links</h2>
                  {data && (
                    <p className="font-bold text-3xl text-white">
                      {data.length ? data.length : 0}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {data && <UrlTable />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
