import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Cek apakah metode yang digunakan adalah GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Panggil serverAuth dengan req dan res untuk autentikasi
    await serverAuth(req, res);

    // Ambil semua film dari database
    const movies = await prismadb.movie.findMany();

    // Kembalikan daftar film
    return res.status(200).json(movies);
  } catch (error) {
    console.error(error); // Ubah console.log ke console.error untuk mencatat kesalahan
    return res.status(500).json({ error: "Internal Server Error" }); // Kembalikan 500 untuk kesalahan internal
  }
}
