import { NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "@/lib/utils";

export const CustomNavMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {
        return path == pathname;
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem className="mr-10" >
                    <NavigationMenuLink asChild
                        // className={pathname === '/' ? "bg-slate-200 rounded-md p-2" : ""}
                        className={cn(isActive('/') && "bg-slate-200 rounded-md", ' p-2')}
                    >
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="mr-10">
                    <NavigationMenuLink asChild
                        // className={pathname === '/search' ? "bg-slate-200 rounded-md p-2" : ""}
                        className={cn(isActive('/search') && "bg-slate-200 rounded-md", ' p-2')}
                    >
                        <Link to="/search">Buscar</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem className="mr-10">
                    <NavigationMenuLink asChild
                        className={pathname.includes('heroe') ? "bg-slate-200 rounded-md p-2" : ""}
                    >
                        <Link to="/heroes/1">Heroe</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

    )
}