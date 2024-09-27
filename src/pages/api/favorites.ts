import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
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
    const { currentUser } = await serverAuth(req, res); // Panggil serverAuth dengan req dan res

    if (!currentUser) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Ambil film favorit berdasarkan favoriteIds
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.error(error); // Ubah console.log ke console.error untuk lebih baik dalam log kesalahan
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
