import { heroApi } from "../api/hero.api";
import type { HeroInfoResponse } from "../types/heroInfo.response";

const url = import.meta.env.VITE_API_URL;

export const getHeroByAliasAction = async (idSlug: string): Promise<HeroInfoResponse> => {

    const { data } = await heroApi.get(`/${idSlug}`);

    return {
        ...data,
        image: `${url}/images/${data.image}`
    }
}