import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface MProps {
    movies: MoviesProps[];
}

const Movies: React.FC<MProps> = () => {
    const [page, setPage] = useState<number>(1);
    const [year, setYear] = useState<number | null>(null);
    const [genre, setGenre] = useState<string>("All");
    const [movies, setMovies] = useState<MoviesProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // Refetch movies when year, genre, or page changes
    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setError(""); // Reset error message before each fetch
        try {
            const response = await fetch("/api/fetch-movies", {
                method: "POST",
                body: JSON.stringify({
                    page,
                    year,
                    genre: genre === "All" ? "" : genre,
                }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            if (!response.ok) {
                throw new Error("Something went wrong while fetching movies");
            }

            const data = await response.json();
            const results = data.movies;

            setMovies(results);
        } catch (error) {
            setError(error.message || "Failed to load movies");
        } finally {
            setLoading(false);
        }
    }, [page, year, genre]);

    // Trigger fetch when page, year, or genre changes
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleGenreChange = (selectedGenre: string) => {
        setGenre(selectedGenre);
        setPage(1); // Reset page to 1 on genre change
    };

    const handleYearChange = (selectedYear: string) => {
        setYear(selectedYear ? Number(selectedYear) : null);
        setPage(1); // Reset page to 1 on year change
    };

    return (
        <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
            <div className="py-16">
                <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
                    />

                    <select
                        onChange={(event) => handleYearChange(event.target.value)}
                        className="border-2 border-[#E2D609] outline-none bg-transparent px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto"
                    >
                        <option value="">Select Year</option>
                        {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
                            <option value={year} key={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <p className="text-[#E2D609] text-xl mb-6 mt-6">
                    Online streaming
                </p>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h1 className="text-lg md:text-6xl font-bold">
                        {year} {genre} Movie List
                    </h1>
                    <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
                        {["All", "Animation", "Comedy", "Fantasy"].map(
                            (genre, key) => (
                                <Button
                                    title={genre}
                                    key={key}
                                    action={() => handleGenreChange(genre)}
                                />
                            )
                        )}
                    </div>
                </div>

                {/* Movies output */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
                    {movies?.map((movie, key) => (
                        <MovieCard
                            title={movie?.title}
                            posterImage={
                                `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                            releaseYear={movie?.release_date.substring(0, 4)}
                            key={key}
                        />
                    ))}
                </div>

                {/* Error or Loading */}
                {error && (
                    <div className="text-red-500 mt-4">
                        <p>{error}</p>
                    </div>
                )}

                <div className="flex justify-end space-x-4 mt-6">
                    <Button
                        title="Previous"
                        action={() =>
                            setPage((prev) => (prev > 1 ? prev - 1 : 1))
                        }
                    />
                    <Button title="Next" action={() => setPage(page + 1)} />
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
};

export default Movies;
