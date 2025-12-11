import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SearchControls } from "./SearchControls";
import { MemoryRouter } from "react-router";

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    window.ResizeObserver = ResizeObserver;
}

const renderSearchControls = (initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    );
};


describe('SearchControls', () => {

    test('should render SearchControls with defaul values', () => {
        const { container } = renderSearchControls();

        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param is set', () => {
        renderSearchControls(['/search/?name=batman']);
        const input = screen.getByRole('textbox')
        // screen.debug(input)
        expect(input.getAttribute('value')).toBe('batman');
    });

    test('should change params when input is changed and enter is pressed', () => {
        renderSearchControls(['/search/?name=batman']);
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'maravilla' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
        // screen.debug(input);
        expect(input.getAttribute('value')).toBe('maravilla');
    });

    test('should change param strehgth when slider is changed', () => {
        renderSearchControls(['/search/?filters=1']);
        const slider = screen.getByRole('slider');

        expect(slider.getAttribute('aria-valuenow')).toBe('0');
        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        fireEvent.keyDown(slider, { key: 'ArrowRight' });
        expect(slider.getAttribute('aria-valuenow')).toBe('3');
        // screen.debug(slider);
    });

    test('should accordion to be open when filters param is set to 1', () => {
        renderSearchControls(['/search/?filters=1']);
        const accordion = screen.getByTestId('accordion-test');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('open');

    });

    test('should accordion to be closed when filters param is set to 0', () => {
        renderSearchControls(['/search/?filters=0']);
        const accordion = screen.getByTestId('accordion-test');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('closed');

    });
});