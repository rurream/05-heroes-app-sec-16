import { SlashIcon } from "lucide-react"
import { Link } from "react-router"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Fragment } from "react/jsx-runtime";

interface BreadCrumbItem {
    name: string;
    link: string;
}
interface Props {
    ruta: BreadCrumbItem[];
}

export const CustomBreadCrumbs = ({ ruta }: Props) => {

    const isLastPage = (index: number) => {
        return index + 1 === ruta.length;
    }

    return (
        <Breadcrumb className="mb-6">
            <BreadcrumbList>
                {
                    ruta.map((item, index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem key={index}>
                                {
                                    isLastPage(index) ? (
                                        <BreadcrumbPage className="font-bold">{item.name}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link to={item.link}>{item.name}</Link>
                                        </BreadcrumbLink >
                                    )
                                }
                            </BreadcrumbItem>
                            {
                                !isLastPage(index) && (
                                    <BreadcrumbSeparator>
                                        <SlashIcon />
                                    </BreadcrumbSeparator>
                                )
                            }
                        </Fragment>

                    ))
                }

            </BreadcrumbList >
        </Breadcrumb >
    )
}