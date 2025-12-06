import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { CustomJumboTron } from "@/components/custom/CustomJumboTron"
import { useParams } from "react-router"
import { HeroInfo } from "../components/HeroInfo";

export const HeroPage = () => {

    const { idSlug = '' } = useParams();

    return (
        <div>
            <CustomJumboTron title="Búsqueda de Universe" description="Descubre, explora, y administra tus superhéroes y villanos favoritos" />
            <CustomBreadCrumbs ruta={[
                { name: 'Home', link: '/' },
                { name: 'Buscar', link: '/search' },
                { name: 'Heroe ', link: '/heroes/1' }
            ]} />
            <h3>HeroPage</h3>

            <HeroInfo idSlug={idSlug} />
        </div>
    )
}