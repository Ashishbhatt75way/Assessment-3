import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import * as modelServices from "./model.services";

export const verifyUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.send(createResponse(null, "Data not found"));
  }
  const prediction = await modelServices.predict(url);
  res.send(createResponse(prediction));
});
