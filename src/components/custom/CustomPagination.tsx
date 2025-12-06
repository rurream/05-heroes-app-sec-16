import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import { useSearchParams } from "react-router";

interface Props {
    totalPages: number;
    limit?: number;
}

export const CustomPagination = ({ totalPages = 1 }: Props) => {

    const [searchParams, setSearchparams] = useSearchParams();
    const queryPage = searchParams.get('page') ?? '1';
    const currentPage = isNaN(+queryPage) ? 1 : +queryPage;

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        searchParams.set('page', page.toString());
        setSearchparams(searchParams);
    }

    return (
        <div className="flex items-center justify-center space-x-2" >
            <Button variant="outline" size="sm" disabled={currentPage - 1 === 0} onClick={() => handlePageChange(currentPage - 1)}>
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {
                Array.from({ length: totalPages }).map((_, index) => (
                    <Button variant={currentPage == index + 1 ? 'default' : 'outline'} size="sm" key={index}
                        onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Button>
                ))
            }
            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div >
    )
}