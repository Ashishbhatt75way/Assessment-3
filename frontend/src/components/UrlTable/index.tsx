import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteShortUrlMutation,
  useGetShortUrlsQuery,
} from "../../services/urlApi";

const UrlTable: React.FC = () => {
  const { data, refetch } = useGetShortUrlsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUrls = (data || []).slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const [deleteShortUrl] = useDeleteShortUrlMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteShortUrl(id).unwrap();
      toast.success("URL deleted successfully");
      refetch(); // Refetch data after deletion
    } catch (error) {
      toast.error("Failed to delete URL");
      console.log(error);
    }
  };

  return (
    <div className="text-white pt-12 rounded-xl shadow-md">
      <h2 className="font-bold text-2xl">Shortened URLs</h2>
      <p className="text-[#a1a1aa]">Manage your active URLs</p>

      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-neutral-800 rounded-lg">
          <thead className="bg-neutral-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left w-40 whitespace-nowrap">
                Short URL
              </th>
              <th className="px-4 py-3 text-left w-80 whitespace-nowrap">
                Original URL
              </th>
              <th className="px-4 py-3 text-left w-20">Clicks</th>
              <th className="px-4 py-3 text-left w-40">Expires At</th>
              <th className="px-4 py-3 text-left w-60">Recent Analytics</th>
              <th className="px-4 py-3 text-left w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUrls.map((url, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-800/10"
              >
                <td className="px-4 py-4 w-40 whitespace-nowrap">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    className="text-gray-400 text-xs hover:underline"
                  >
                    {url.shortUrl}
                  </a>
                </td>
                <td className="px-4 py-4 text-gray-300 truncate text-xs max-w-[200px] overflow-hidden text-ellipsis">
                  {url.originalUrl}
                </td>
                <td className="px-4 text-gray-300 text-xs py-4 w-20 text-center">
                  {url.clicks}
                </td>
                <td className="px-4 text-gray-300 text-xs py-4 w-40 whitespace-nowrap">
                  {new Date(url.expiresAt).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-xs max-w-24 text-gray-500 w-60 overflow-hidden truncate text-ellipsis">
                  {url.analytics.slice(0, 2).map((entry, i) => (
                    <div key={i} className="text-wrap">
                      {entry.timestamp} - {entry.browser} ({entry.device}) from{" "}
                      {entry.location}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-4 w-20">
                  <button
                    onClick={() => handleDelete(url.id)}
                    className="text-red-500 flex items-center justify-center hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-5 flex items-center gap-6 justify-center">
        <button
          className="p-4 cursor-pointer rounded-full h-16 flex items-center justify-center text-gray-400 w-16 outline outline-1 outline-gray-700"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        <span className="text-white text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="p-4 cursor-pointer rounded-full h-16 flex items-center justify-center text-gray-400 w-16 outline outline-1 outline-gray-700"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default UrlTable;
