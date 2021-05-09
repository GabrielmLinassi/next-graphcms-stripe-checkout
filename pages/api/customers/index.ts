import { NextApiRequest, NextApiResponse } from "next";

import api from "./../utils/api";

interface Data {
  message: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { email, firstname } = req.body;
    const { data } = await api.post("/customers", { email, firstname });
    return res.status(201).json(data);
  }

  if (req.method === "GET") {
    return res.json({ message: "method GET" });
  }

  res.status(405).json({ message: "method not allowed" });
}
