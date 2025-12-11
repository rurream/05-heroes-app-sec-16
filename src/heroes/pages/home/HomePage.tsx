import {
    Heart
} from "lucide-react"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CustomJumboTron } from "@/components/custom/CustomJumboTron"
import { HeroStats } from "../../components/HeroStats"
import { HeroGrid } from "../../components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"

import { useHeroSummary } from "../../hooks/useHeroSummary"
import { usePaginatedHeroes } from "../../hooks/usePaginatedHeroes"
import { FavoriteHeroContext } from "../../context/FovoriteHeroContext"



export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { data: summary } = useHeroSummary();
    const { favorites, favoriteCount } = use(FavoriteHeroContext);

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    const { data: heroesResponse } = usePaginatedHeroes(page, limit, category);


    return (
        <>
            <CustomJumboTron title="Superhero Universe" description="Discover, explore, and manage your favorite superheroes and villains" />

            <CustomBreadCrumbs ruta={[{ name: 'Home', link: '/' }]} />

            <HeroStats />

            {/* Tabs */}
            <Tabs value={selectedTab} className="mb-8" >
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'all');
                        prev.set('category', 'all');
                        prev.set('page', '1');
                        return prev;
                    })}>All Characters ({summary?.totalHeroes})</TabsTrigger>
                    <TabsTrigger value="favorites" onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'favorites');
                        prev.set('category', 'favorite');
                        return prev;
                    })} className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Favorites ({favoriteCount})
                    </TabsTrigger>
                    <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
                        prev.set('tab', 'heroes');
                        prev.set('category', 'hero');
                        prev.set('page', '1');
                        return prev;
                    })}>Heroes ({summary?.heroCount})</TabsTrigger>
                    <TabsTrigger value="villains" onClick={() => {
                        setSearchParams((prev) => {
                            prev.set('tab', 'villains');
                            prev.set('category', 'villain');
                            prev.set('page', '1');
                            return prev
                        })
                    }}>Villains ({summary?.villainCount})</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <h1>All Characters</h1>
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                </TabsContent>

                <TabsContent value="favorites">
                    <h1>Favorites</h1>
                    <HeroGrid heroes={favorites} />
                </TabsContent>

                <TabsContent value="heroes">
                    <h1>Heroes</h1>
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                </TabsContent>

                <TabsContent value="villains">
                    <h1>Villains</h1>
                    <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                </TabsContent>
            </Tabs >

            {
                selectedTab !== 'favorites' && (
                    <CustomPagination totalPages={heroesResponse?.pages ?? 2} />
                )
            }
        </ >
    )
}
