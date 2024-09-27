import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Cek metode HTTP
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res); // Panggil serverAuth dengan req dan res

      const { movieId } = req.body;

      // Validasi movieId
      if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
      }

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        return res.status(404).json({ error: "Invalid ID" });
      }

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(updatedUser);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res); // Panggil serverAuth dengan req dan res

      const { movieId } = req.body;

      // Validasi movieId
      if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
      }

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        return res.status(404).json({ error: "Invalid ID" });
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error); // Ubah console.log ke console.error untuk lebih baik dalam log kesalahan
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
