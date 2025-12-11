import { createContext, useEffect, useState, type PropsWithChildren } from "react";

import * as z from 'zod';
import type { Hero } from "../types/hero.interface";



interface FavoriteHeroCntextType {
    //state
    favorites: Hero[];
    favoriteCount: number;

    //methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;

}

const HeroSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    alias: z.string(),
    powers: z.array(z.string()),
    description: z.string(),
    strength: z.number(),
    intelligence: z.number(),
    speed: z.number(),
    durability: z.number(),
    team: z.string(),
    image: z.string(),
    firstAppearance: z.string(),
    status: z.string(),
    category: z.string(),
    universe: z.string(),
});
const HeroesSchema = z.array(HeroSchema);

const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites');
    if (!favorites) return [];
    const result = HeroesSchema.safeParse(JSON.parse(favorites));

    if (result.error) {
        return []
    }
    return result.data;
    // return favorites ? JSON.parse(favorites) : [];
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroCntextType);


export const FavoriteHeroContextProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const isFavorite = (hero: Hero) => {
        const liked = favorites.find(heroe => hero.id === heroe.id);
        // const liked = favorites.some(heroe => hero.id === heroe.id);
        if (liked) return true;
        return false;
    }

    const toggleFavorite = (hero: Hero) => {

        if (isFavorite(hero)) {
            const newFavorites = favorites.filter((item) => item.id !== hero.id);
            setFavorites(newFavorites);
        } else {
            setFavorites(prev => [...prev, hero]);
        }
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites,])


    return (
        <FavoriteHeroContext value={{
            favorites: favorites,
            favoriteCount: favorites.length,
            isFavorite: isFavorite,
            toggleFavorite: toggleFavorite
        }}>{children}</FavoriteHeroContext>
    )
}