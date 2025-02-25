import * as yup from "yup";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContentCopy, Share } from "@mui/icons-material";
import useDeviceDetails from "../../hooks/useDeviceDetails";
import { usePredictMutation } from "../../services/predictApi";
import { useCreateShortUrlMutation } from "../../services/urlApi";
import { AnimatePresence, motion } from "motion/react";

const schema = yup.object().shape({
  url: yup.string().url("Invalid URL").required("URL is required"),
});

type FormData = yup.InferType<typeof schema>;

const GenerateQR: React.FC = () => {
  const [urlData, setUrlData] = useState<ShortenedURL | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [createShortUrl, { isLoading }] = useCreateShortUrlMutation();
  const deviceDetails = useDeviceDetails();

  const [predictUrl] = usePredictMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleUrlSubmit = async (data: FormData) => {
    try {
      // const prediction = await predictUrl(data.url);

      // if (prediction.data !== "benign") {
      //   toast.error(
      //     `This URL is ${prediction.data.data}!. Please try again with valid email.`
      //   );
      //   return;
      // }

      const date = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;

      const urlData = {
        id: Math.random().toString(36).substring(2, 8),
        originalUrl: data.url,
        shortCode: Math.random().toString(36).substring(2, 8),
        shortUrl: `http://localhost:5000/${Math.random()
          .toString(36)
          .substring(2, 8)}`,
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        qrCode: `http://localhost:5000/qrcodes/arb112.png?data=${data.url}`,
        clicks: 0,
        analytics: [
          {
            date,
            location: deviceDetails.location.address,
            browser: deviceDetails.browser,
            device: deviceDetails.device,
          },
        ],
      };

      const response = await createShortUrl(urlData).unwrap();

      setUrlData(response);
      if (response) {
        toast.success("URL shortening successful!");
      }
    } catch (error) {
      toast.error("Error shortening URL. Please try again.");
    }
    reset();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSnackbarOpen(true);
    setTimeout(() => setSnackbarOpen(false), 3000);
  };

  const shareUrl = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared URL",
          text: "Check out this link!",
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black flex pt-32 justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 outline-none antialiased mb-8">
          URL Shortener & QR Code Generator
        </h1>

        <form onSubmit={handleSubmit(handleUrlSubmit)} className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <input
              type="text"
              {...register("url")}
              placeholder="Enter URL"
              className="rounded-xl w-96 h-12 pl-4 bg-neutral-800/70 text-white outline-[#060606] outline-[1px] placeholder:text-neutral-400 placeholder:text-sm placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="h-12 px-6 py-2 bg-neutral-100 text-neutral-900 font-medium rounded-xl hover:bg-neutral-300  disabled:opacity-50"
            >
              {isLoading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Shorten URL"
              )}
            </button>
          </div>
          {errors.url && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errors.url.message}
            </p>
          )}
        </form>

        <AnimatePresence>
          {urlData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" bg-neutral-50 max-w-[550px] mx-auto flex flex-col items-center rounded-xl shadow-lg p-6 mt-4"
            >
              <h2 className="text-3xl text-center font-semibold text-gray-900 mb-4">
                Generated QR Code
              </h2>
              <div className="flex flex-col items-center justify-center">
                <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white p-4 rounded-lg mt-2">
                  <QRCodeSVG value={urlData.shortUrl} size={200} level="H" />
                </div>
                <div className="flex gap-6">
                  <a className="text-gray-700 text-base mt-4 cursor-pointer">
                    Shortened URL: {urlData.shortUrl}
                  </a>
                  <button
                    onClick={() => copyToClipboard(urlData.shortUrl)}
                    className="mt-2 text-blue-500"
                  >
                    <ContentCopy />
                  </button>
                  <button
                    onClick={() => shareUrl(urlData.shortUrl)}
                    className="mt-2 text-green-500"
                  >
                    <Share />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {snackbarOpen && (
          <div className="fixed bottom-4 left-1/2 text-sm transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
            Copied to clipboard
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateQR;
