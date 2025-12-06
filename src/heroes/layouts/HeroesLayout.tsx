import { CustomNavMenu } from "@/components/custom/CustomNavMenu"
import { Outlet } from "react-router"


export const HeroesLayout = () => {
    return (
        // <>
        //     <div className=" p-5">
        //         <h1>HeroesLayout</h1>
        //         <div className="flex flex-row gap-10 mx-[300px] text-1xl underline h-[100px] pt-5">
        //             <Link to={'/'}>Home</Link>
        //             <Link to={'/search'}>Búsqueda</Link>
        //             <Link to={'/heroes/1'}>Heroe</Link>
        //             <Link to={'/admin'}>Admin</Link>
        //         </div>
        //     </div>
        //     <section className="pt-5 h-screen bg-green-50">
        //         <Outlet />
        //     </section>
        // </>
        <div className="min-h-screen bg-gradient from-slate-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto p-6">
                <CustomNavMenu />
                <Outlet />
            </div>
        </div>
    )
}