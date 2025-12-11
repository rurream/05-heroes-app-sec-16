import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const url = import.meta.env.VITE_API_URL;
interface Options {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

export const searchHerosAction = async (options: Options): Promise<Hero[]> => {
    if (Object.keys(options).length === 0) return [];
    // const params: Options = {};

    // for (const key in options) {
    //     if (key === 'name') {
    //         if (options[key] !== '') params[key] = options[key]
    //     };
    //     if (key === 'team') params[key] = options[key];
    //     if (key === 'category') params[key] = options[key];
    //     if (key === 'universe') params[key] = options[key];
    //     if (key === 'status') params[key] = options[key]
    //     if (key === 'strength') params[key] = options[key]
    // }
    // console.log(options, params);
    // if (Object.keys(params).length === 0) return [];
    const { data } = await heroApi.get<Hero[]>(`/search`, {
        params: options
    });

    const heroes: Hero[] = data.map(heroe => {
        return {
            ...heroe,
            image: `${url}/images/${heroe.image}`
        }
    });
    return heroes ?? [];
}