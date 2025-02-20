import asyncHandler from "express-async-handler";
import fs from "fs";
import { createResponse } from "../common/helper/response.hepler";
import { Request, Response } from "express";

export const getData = asyncHandler(async (req: Request, res: Response) => {
  const data = fs.readFileSync(
    "./app/json-data/url-shortner-dummy.json",
    "utf8"
  );
  console.log(JSON.parse(data));

  if (data) {
    res.send(createResponse(data, "Data fetched sucssefully"));
  }
});

export const postData = asyncHandler(async (req: Request, res: Response) => {
  const data = fs.readFileSync(
    "./app/json-data/url-shortner-dummy.json",
    "utf8"
  );
  const jsonData = JSON.parse(data);
  const newData = req.body;
  jsonData.push(newData);
  fs.writeFileSync(
    "./app/json-data/url-shortner-dummy.json",
    JSON.stringify(jsonData)
  );
  res.send(createResponse(newData, "Data added sucssefully"));
});
