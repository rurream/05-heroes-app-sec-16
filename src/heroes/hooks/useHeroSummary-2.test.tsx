
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from "vitest";
import { useHeroSummary } from "./useHeroSummary";
// import { tanStackCustomProviderMock } from '../../../test/mocks/queryClientProviderMock'
import { getSummaryAction } from '../actions/get-summary.actions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

vi.mock('../actions/getSummaryAction', () => ({
    getSummaryAction: vi.fn(),
}));
const mockGetSummaryAction = vi.mocked(getSummaryAction);

const tanStackCustomProviderMock = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

describe('useHeroSummary', () => {

    test('should return error state when API call fails', async () => {

        const mockError = new Error('Failed to fetch summary');
        mockGetSummaryAction.mockRejectedValue(mockError);
        // beforeEach(() => {
        //     mockGetSummaryAction.mockRejectedValue(mockError);
        // });
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProviderMock()
        });
        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });
    });
});