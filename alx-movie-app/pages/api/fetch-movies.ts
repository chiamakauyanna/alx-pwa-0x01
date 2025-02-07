import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "POST") {
        const { year, page, genre } = request.body;
        const date = new Date();
        
        try {
            const apiKey = process.env.MOVIE_API_KEY; 
            const resp = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&year=${
        year || date.getFullYear() }&sort=year.decr&limit=12&page=${page}&${genre && `genre=${genre}`}`
            );

            if (!resp.ok) {
                throw new Error(`Failed to fetch movies. Status: ${resp.status}`);
            }

            const moviesResponse = await resp.json();
            const movies: MoviesProps[] = moviesResponse.results;

            return response.status(200).json({
                movies,
            });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    } else {
        response.setHeader("Allow", ["POST"]);
        response.status(405).end(`Method ${request.method} Not Allowed`);
    }
}
