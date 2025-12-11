import { use } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FavoriteHeroContext, FavoriteHeroContextProvider } from "./FovoriteHeroContext";
import { fireEvent, render, screen } from "@testing-library/react";
import type { Hero } from "../types/hero.interface";


const mockHero = {
    id: '1',
    name: 'batman',
    slug: 'string',
    alias: 'string',
    powers: [],
    description: 'string',
    strength: 2,
    intelligence: 2,
    speed: 2,
    durability: 2,
    team: 'string',
    image: 'string',
    firstAppearance: 'string',
    status: 'string',
    category: 'string',
    universe: 'string',
} as unknown as Hero;


const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

const TestComponent = () => {

    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    return (
        <div>
            <div data-testid='favorite-count'>{favoriteCount}</div>
            <div data-testid='favorite-list'>
                {
                    favorites.map(hero => (
                        <div key={hero.id} data-testid={`hero-${hero.id}`}>{hero.name}</div>
                    ))
                }
            </div>
            <button data-testid='toggle-favorite' onClick={() => toggleFavorite(mockHero)} >Toggle Favorite</button>
            <div data-testid='is-favorite'>{isFavorite(mockHero).toString()}</div>
        </div>
    )
}

const renderContextTest = () => {
    return render(
        <FavoriteHeroContextProvider>
            <TestComponent />
        </FavoriteHeroContextProvider>
    )
}

describe('FovoriteHeroContext', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should initialize with default values', () => {
        // console.log(localStorage);
        renderContextTest();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorites when toggleFavorite is called with new hero', () => {

        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        // const mockLocalStorage = localStorage.getItem('favorites');
        // const mockLocalStorage = localStorageMock.getItem('favorites');

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');
        // expect(mockLocalStorage).toBe('[{"id":"1","name":"batman","slug":"string","alias":"string","powers":[],"description":"string","strength":2,"intelligence":2,"speed":2,"durability":2,"team":"string","image":"string","firstAppearance":"string","status":"string","category":"string","universe":"string"}]');
        expect(localStorageMock.setItem).toBeCalled();
        expect(localStorageMock.setItem).toBeCalledWith('favorites', '[{"id":"1","name":"batman","slug":"string","alias":"string","powers":[],"description":"string","strength":2,"intelligence":2,"speed":2,"durability":2,"team":"string","image":"string","firstAppearance":"string","status":"string","category":"string","universe":"string"}]');
    });

    test('should remove hero from favorites when toggleFavorite is called with favorited hero', async () => {

        // localStorage.setItem('favorites', JSON.stringify([mockHero]));
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));
        // console.log(localStorageMock.getItem('favorites'));
        renderContextTest();

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');
        expect(localStorageMock.getItem('favorites')).toBe('[{"id":"1","name":"batman","slug":"string","alias":"string","powers":[],"description":"string","strength":2,"intelligence":2,"speed":2,"durability":2,"team":"string","image":"string","firstAppearance":"string","status":"string","category":"string","universe":"string"}]');

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();
        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[]');
    });
});