import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { SummaryInformationResponse } from "../types/summary-information.response";
import { heroMock, mockSummaryData } from '../../../test/mocks/mockSummaryData'
import { FavoriteHeroContextProvider } from "../context/FovoriteHeroContext";


vi.mock('../hooks/useHeroSummary');
// vi.mock('../hooks/useHeroSummary', () => ({
//     useHeroSummary: vi.fn(),
// }));
const mockUseHeroSummary = vi.mocked(useHeroSummary);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>) => {
    if (mockData) {
        mockUseHeroSummary.mockReturnValue({
            data: mockData,
        } as unknown as ReturnType<typeof useHeroSummary>);
    } else {
        mockUseHeroSummary.mockReturnValue({
            data: undefined,
        } as unknown as ReturnType<typeof useHeroSummary>);
    }

    return render(
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroContextProvider>
                <HeroStats />
            </FavoriteHeroContextProvider>
        </QueryClientProvider>
    );
}


describe('HeroStats', () => {
    test('should render commponnet with default values', () => {

        renderHeroStats();
        // screen.debug();

        expect(screen.getByText('Loading ...')).toBeDefined();
    });

    test('should render heroStats with mock information', () => {

        const { container } = renderHeroStats(mockSummaryData);
        // screen.debug();

        expect(container).toMatchSnapshot();
        expect(screen.getByText('Total Characters')).toBeDefined();
        expect(screen.getByText('Favorites')).toBeDefined();
        expect(screen.getByText('Strongest')).toBeDefined();
    });

    test('should change the percentage of favarites when a hero is added to favorites', () => {
        localStorage.setItem('favorites', JSON.stringify([heroMock]));
        renderHeroStats(mockSummaryData);


        const favoriteCountElement = screen.getByTestId('favorite-count');
        const favoritePercentageElement = screen.getByTestId('favorite-percentage');

        expect(favoriteCountElement.innerHTML).toContain('1');
        expect(favoritePercentageElement.innerHTML).toContain('4%');
        // screen.debug(favoritePercentageElement);
    });
});