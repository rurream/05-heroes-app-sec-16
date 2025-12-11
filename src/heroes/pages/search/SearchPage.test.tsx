import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import SearchPage from "./SearchPage";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { searchHerosAction } from "@/heroes/actions/search-heros.action";
import type { Hero } from "@/heroes/types/hero.interface";
// import { HeroGrid } from "@/heroes/components/HeroGrid";

vi.mock('@/heroes/actions/search-heros.action');
const mockSearchHeroesAction = vi.mocked(searchHerosAction);

vi.mock('./ui/SearchControls', () => ({
    SearchControls: () => <div data-testid='search-controls'></div>
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
        <div data-testid='hero-grid'>
            {
                heroes.map(hero => (
                    <div key={hero.id}>{hero.name}</div>
                ))
            }
        </div>
    )
}));

const queryClient = new QueryClient();

const renderSearchPageMock = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    )
}



describe('SearchPage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render with default values', () => {
        renderSearchPageMock();

        expect(screen).toMatchSnapshot();
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: '',
            strength: '0'
        });
    });

    test('should call search action with name parameter', () => {

        renderSearchPageMock(['/search/?name=superman']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: 'superman',
            strength: '0'
        });
    });

    test('should call search action with strength parameter', () => {

        renderSearchPageMock(['/search/?strengthState=7']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: '',
            strength: '7'
        });
    });

    test('should call search action with name and strength parameters', () => {

        renderSearchPageMock(['/search/?name=batman&strengthState=4']);

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            name: 'batman',
            strength: '4'
        });
    });

    test('should render heroGrid with search results', async () => {

        const mockHeroes = [
            { id: '1', name: 'Clark Kent' } as unknown as Hero,
            { id: '2', name: 'Bruce Wayne' } as unknown as Hero,
        ];

        mockSearchHeroesAction.mockResolvedValue(mockHeroes);
        renderSearchPageMock();
        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined();
        });
        // const componentHeroGrid = screen.getByTestId('hero-grid');
        // screen.debug(componentHeroGrid);
        expect(screen.getByTestId('hero-grid')).toBeDefined();
    });
});