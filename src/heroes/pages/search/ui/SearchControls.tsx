import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react"
import { useRef } from "react"
import { useSearchParams } from "react-router"

export const SearchControls = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchparams] = useSearchParams();
    const filterState = searchParams.get('filters') ?? '0';
    const strengthState = searchParams.get('strengthState') ?? '0';

    const setQueryParams = (name: string, value: string) => {
        setSearchparams(prev => {
            prev.set(name, value);
            return prev;
        });
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {

            if (inputRef.current) {
                setQueryParams('name', inputRef.current.value.toString());
            }
        }
    }

    const handleToggleFilters = () => {
        // const filterState = searchParams.get('filters');
        if (filterState) {
            if (filterState === '1') {
                setQueryParams('filters', '0');
            } else {
                setQueryParams('filters', '1');
            }
        } else {
            setQueryParams('filters', '1');
        }
    }

    const handleStrengthChange = (e: number[]) => {
        setQueryParams('strengthState', e[0].toString());
    }


    return (
        <>
            {/* Controls */}
            < div className="flex flex-col lg:flex-row gap-4 mb-8" >
                {/* Search */}
                <div className="relative flex-1" >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input placeholder="Search heroes, villains, powers, teams..." className="pl-12 h-12 text-lg bg-white"
                        ref={inputRef}
                        onKeyDown={(e) => handleKeyDown(e)}
                        defaultValue={searchParams.get('name') ?? ''} />
                </div >

                {/* Action buttons */}
                <div className="flex gap-2" >
                    <Button variant={filterState === '1' ? 'default' : "outline"} className="h-12 " onClick={handleToggleFilters}>
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12 ">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12 ">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Character
                    </Button>
                </div >
            </div >

            {/* Advanced Filters */}
            <Accordion type="single" collapsible value={filterState} data-testid='accordion-test'>
                <AccordionItem value="1">
                    {/* <AccordionTrigger>Is it accessible?</AccordionTrigger> */}
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border" >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button variant="ghost">Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Team</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All teams
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All categories
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Universe</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All universes
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All statuses
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: {strengthState}/10</label>
                                <Slider defaultValue={[Number(strengthState)]} max={10} step={1} onValueChange={(e) => handleStrengthChange(e)} />
                            </div>
                        </div >
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </>
    )
}