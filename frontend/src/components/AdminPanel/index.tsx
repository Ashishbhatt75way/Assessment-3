import { ListOrdered, UsersRound } from "lucide-react";
import React, { Suspense } from "react";
import { useMeQuery } from "../../services/api";
import { useGetShortUrlsQuery } from "../../services/urlApi";
import TableSkeleton from "../Table/TableSkeleton";
const UrlTable = React.lazy(() => import("../Table"));

const Page = () => {
  const { data } = useGetShortUrlsQuery();
  const { data: user } = useMeQuery();

  return (
    <div className="w-full">
      <div className="w-[80%] h-full bg-black absolute right-0">
        <div className="w-full h-full bg-black flex flex-col">
          <div className="p-10 flex items-center bg-black justify-between gap-5">
            <div className="flex items-center justify-center ml-6">
              <h2 className="text-4xl font-bold">
                Hi <span className="text-[#dbff6e]">{user?.data.name} 👋</span>,
              </h2>
            </div>
          </div>

          <div className="w-full flex h-full  pt-3 gap-2 items-center flex-col">
            <div className="w-[90%] h-32 flex rounded-xl bg-neutral-600/15 py-8">
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
                      {data?.length ? data?.length : 0}
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
                      {data?.length ? data?.length : 0}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Suspense fallback={<TableSkeleton />}>
              {data && <UrlTable />}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
