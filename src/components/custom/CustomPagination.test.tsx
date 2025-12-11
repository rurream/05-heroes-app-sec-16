import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren, ReactElement } from "react";


// const renderCustomPaginationWithRouter = () => {
//     return render(
//         <MemoryRouter>
//             <CustomPagination totalPages={5} />
//         </MemoryRouter>
//     )
// }
const renderCustomPaginationWithRouter = (component: ReactElement, initialEntryes?: string[]) => {
    return render(
        <MemoryRouter initialEntries={initialEntryes}>
            {component}
        </MemoryRouter>
    )
}

vi.mock('../ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>{children}</button>
    )
}));

describe('CustomPagination', () => {
    test('should render commponent with default values', () => {
        renderCustomPaginationWithRouter(<CustomPagination totalPages={5} />);

        // screen.debug();
        expect(screen.getByText('Previous')).toBeDefined();
        expect(screen.getByText('Next')).toBeDefined();
        expect(screen.getByText('1')).toBeDefined();
    });

    test('should disable previous button when page is 1', () => {
        renderCustomPaginationWithRouter(<CustomPagination totalPages={5} />);
        const previousButton = screen.getByText('Previous');

        expect(previousButton.getAttributeNames()).toContain('disabled');
    });

    test('should disable next button when we are in the last page', () => {
        renderCustomPaginationWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);
        const nextButton = screen.getByText('Next');
        // const lastButton = screen.getByText('5');
        // fireEvent.click(lastButton);

        expect(nextButton.getAttributeNames()).toContain('disabled');
    });

    test('should disable button 3 when we are in page 3', () => {
        renderCustomPaginationWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);
        const treeButton = screen.getByText('3');

        expect(treeButton.getAttribute('variant')).toContain('default');
    });

    test('should change page when click on number button', () => {
        renderCustomPaginationWithRouter(<CustomPagination totalPages={5} />, ['/?page=3']);
        const button2 = screen.getByText('2');
        const button3 = screen.getByText('3');

        expect(button2.getAttribute('variant')).toContain('outline');
        expect(button3.getAttribute('variant')).toContain('default');

        fireEvent.click(button2);

        expect(button2.getAttribute('variant')).toContain('default');
        expect(button3.getAttribute('variant')).toContain('outline');
    });
});