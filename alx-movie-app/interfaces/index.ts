import { ReactNode } from "react";

export interface ComponentProps {
    children: ReactNode;
}

export interface ButtonProps {
    title: string;
    action?: () => void;
}

export interface MovieProps {
    id?: string;
    posterImage: string;
    releaseYear: string;
    title: string;
}

interface PosterPath {
    url: string;
}

interface Title {
    text: string;
}

interface ReleaseDate {
    year: string;
}

export interface MoviesProps {
    id: string;
    poster_path: string;
    title: string;
    release_date: string;
}
