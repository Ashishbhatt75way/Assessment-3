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
  url: yup.string().required("URL is required"),
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
      const prediction = await predictUrl(data.url);

      if (prediction.data.prediction !== "benign") {
        toast.error(
          `This URL is ${prediction.data.prediction}!. Please try again with valid URL.`
        );
        return;
      }

      const date = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;

      const urlData = {
        id: Math.random().toString(36).substring(2, 8),
        originalUrl: data.url,
        shortCode: Math.random().toString(36).substring(2, 8),
        shortUrl: `http://lh:5000/${Math.random()
          .toString(36)
          .substring(2, 8)}`,
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        qrCode: `http://lh:5000/qrcodes/arb112.png?data=${data.url}`,
        clicks: Math.random() * 50,
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
    <div className="min-h-screen bg-black flex flex-col pt-32 sm:pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 outline-none antialiased mb-6 sm:mb-8">
          URL Shortener & QR Code Generator
        </h1>

        <form onSubmit={handleSubmit(handleUrlSubmit)} className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <input
              type="text"
              {...register("url")}
              placeholder="Enter URL"
              className="rounded-xl w-full sm:w-96 h-12 pl-4 bg-neutral-800/70 text-white outline-[#060606] outline-[1px] placeholder:text-neutral-400 placeholder:text-sm placeholder-gray-400 mb-3 sm:mb-0"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto h-12 px-6 py-2 bg-neutral-100 text-neutral-900 font-medium rounded-xl hover:bg-neutral-300 disabled:opacity-50"
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
              className="bg-neutral-50 w-full max-w-[550px] mx-auto flex flex-col items-center rounded-xl shadow-lg p-4 sm:p-6 mt-4"
            >
              <h2 className="text-2xl sm:text-3xl text-center font-semibold text-gray-900 mb-3 sm:mb-4">
                Generated QR Code
              </h2>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white p-3 sm:p-4 rounded-lg mt-2">
                  <QRCodeSVG
                    value={urlData.shortUrl}
                    size={150}
                    className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
                    level="H"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 w-full mt-4">
                  <a className="text-gray-700 text-sm sm:text-base text-center sm:text-left cursor-pointer truncate max-w-full">
                    Shortened URL: {urlData.shortUrl}
                  </a>
                  <div className="flex gap-4 mt-2 sm:mt-0">
                    <button
                      onClick={() => copyToClipboard(urlData.shortUrl)}
                      className="text-blue-500"
                      aria-label="Copy to clipboard"
                    >
                      <ContentCopy />
                    </button>
                    <button
                      onClick={() => shareUrl(urlData.shortUrl)}
                      className="text-green-500"
                      aria-label="Share URL"
                    >
                      <Share />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {snackbarOpen && (
          <div className="fixed bottom-4 left-1/2 text-sm transform -translate-x-1/2 bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg z-50">
            Copied to clipboard
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateQR;
