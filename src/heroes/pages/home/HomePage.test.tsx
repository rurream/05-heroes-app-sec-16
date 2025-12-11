import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroContextProvider } from "@/heroes/context/FovoriteHeroContext";

// no es necesario inyectar defaultoptions porque manejamos la respuesta del query
const queryClient = new QueryClient();

vi.mock('../../hooks/usePaginatedHeroes');
const mockUsePaginatedHero = vi.mocked(usePaginatedHeroes);
mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHeroes>);

const renderHomePageMock = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroContextProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroContextProvider>
        </MemoryRouter>

    );
}


describe('HomePage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render homePage with default values', () => {

        const { container } = renderHomePageMock();

        expect(container).toMatchSnapshot();
    });

    test('should call usePaginatedHeroes with default values', () => {

        renderHomePageMock();

        expect(mockUsePaginatedHero).toHaveBeenCalledWith('1', '6', 'all');
    });

    test('should call usePaginatedHeroes with custom query params', () => {

        renderHomePageMock(['/?page=2&limit=5&category=villain']);

        expect(mockUsePaginatedHero).toHaveBeenCalledWith('2', '5', 'villain');
    });

    test('should call usePaginatedHeroes with default page and same limit on tab clicked', () => {

        renderHomePageMock(['/?tab=favorites&page=2&limit=5&category=villain']);
        const [, , , villainsTab] = screen.getAllByRole('tab');

        fireEvent.click(villainsTab);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith('2', '5', 'villain');
    });
});