import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { usePaginatedHeroes } from "./usePaginatedHeroes";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeroesByPageAction: vi.fn(),
}));
const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const tanStackCustomProviderMock = () => {

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('usePaginatedHeroes', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });


    test('should return the initial state (isLoading)', () => {

        const { result } = renderHook(() => usePaginatedHeroes('1'), {
            wrapper: tanStackCustomProviderMock()
        });

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBeUndefined();
    });

    test('should return success state with data when API call succeds', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        }

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHeroes('1', '6', undefined), {
            wrapper: tanStackCustomProviderMock()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBeDefined();
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, undefined);

    });

    test('should return success state when API is called with specific arguments', async () => {

        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        }

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => usePaginatedHeroes('2', '5', 'testArgument'), {
            wrapper: tanStackCustomProviderMock()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBeDefined();
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 5, 'testArgument');

    });
});