import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth"; // Pastikan untuk mengimpor serverAuth

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Cek apakah metode yang digunakan adalah GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Panggil serverAuth dengan req dan res
    const { currentUser } = await serverAuth(req, res);

    // Jika currentUser tidak ada, kembalikan 401 Unauthorized
    if (!currentUser) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Kembalikan data currentUser
    return res.status(200).json(currentUser);
  } catch (error) {
    console.error(error); // Ubah console.log ke console.error untuk lebih baik dalam log kesalahan
    return res.status(500).json({ error: "Internal Server Error" }); // Kembalikan 500 untuk kesalahan internal
  }
}
