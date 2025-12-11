import { CustomJumboTron } from "@/components/custom/CustomJumboTron";
import { HeroStats } from "../../components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { useQuery } from "@tanstack/react-query";
import { searchHerosAction } from "../../actions/search-heros.action";
import { HeroGrid } from "../../components/HeroGrid";
import { useSearchParams } from "react-router";

export const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const filtroName = searchParams.get('name') ?? '';
    const strengthState = searchParams.get('strengthState') ?? '0';

    const { data: searchedHeroes = [] } = useQuery({
        queryKey: ['search', { name: filtroName, strength: strengthState }],
        queryFn: () => searchHerosAction({ name: filtroName, strength: strengthState }),
        staleTime: 1000 * 60 * 5
    });
    // console.log(data);

    return (
        <>
            <CustomJumboTron title="Búsqueda de Universe" description="Descubre, explora, y administra tus superhéroes y villanos favoritos" />

            <CustomBreadCrumbs ruta={[{ name: 'Home', link: '/' }, { name: 'Buscar', link: '/search' }]} />

            <HeroStats />

            <SearchControls />
            {
                searchedHeroes.length === 0 ? (
                    <div className="flex justify-center mt-20">
                        <h2 className="font-bold text-2xl">No se encontraron registros</h2>
                    </div>
                ) : (
                    <HeroGrid heroes={searchedHeroes} />
                )
            }

        </>
    )
}

export default SearchPage;