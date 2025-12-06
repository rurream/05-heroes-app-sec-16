import { useQuery } from "@tanstack/react-query";
import { getHeroByAliasAction } from "../actions/get-hero-by-alias.action";




export const useHeroInfo = (idSlug: string) => {

    const { data } = useQuery({
        queryKey: ['heroInfo', { idSlug: idSlug }],
        queryFn: () => getHeroByAliasAction(idSlug),
        staleTime: 1000 * 60 * 5,
    });

    const averagePower = () => {

        if (data) {
            return Math.round(((data.strength + data.durability + data.intelligence + data.speed) / 4) * 10)
        } else {
            return 0
        }
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "activo":
                return "bg-green-500"
            case "inactivo":
                return "bg-gray-500"
            case "retirado":
                return "bg-blue-500"
            default:
                return "bg-gray-500"
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case "héroe":
                return "bg-blue-500"
            case "villano":
                return "bg-red-500"
            case "antihéroe":
                return "bg-purple-500"
            default:
                return "bg-gray-500"
        }
    }

    const stInteligencia = data ? data.intelligence * 10 : 0;
    const stFuerza = data ? data.strength * 10 : 0;
    const stVelocidad = data ? data.speed * 10 : 0;
    const stResistencia = data ? data.durability * 10 : 0;

    return {
        data,
        stInteligencia,
        stFuerza,
        stVelocidad,
        stResistencia,

        averagePower,
        getStatusColor,
        getCategoryColor,
    }
}