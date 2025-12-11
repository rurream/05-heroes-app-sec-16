import { describe, expect, test, vi } from "vitest";
import { appRouter } from "./app.routes";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider, useParams } from "react-router";

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    HeroesLayout: () => <div data-testid='heroes-layout'>
        <Outlet />
    </div>
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid='home-page'></div>
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { idSlug = '' } = useParams();
        return (
            <div data-testid='hero-page'>Hero - {idSlug}</div>
        )
    }
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
    default: () => <div data-testid='search-page'></div>
}));

//-----

vi.mock('@/admin/layouts/AdminLayout', () => ({
    AdminLayout: () => <div data-testid='admin-layout'>
        <Outlet />
    </div>
}));
vi.mock('@/admin/pages/AdminPage', () => ({
    default: () => <div data-testid='admin-page'></div>
}));

describe('appRouter', () => {
    test('should be configured as spected', () => {
        expect(appRouter.routes).toMatchSnapshot();
    });

    test('should render homePage a root path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/']
        });
        render(<RouterProvider router={router} />);

        // screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render heroPage at /heroes/:isSlug path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/batman']
        });
        render(<RouterProvider router={router} />);

        // screen.debug();
        expect(screen.getByTestId('hero-page')).toBeDefined();
        expect(screen.getByTestId('hero-page').innerHTML).toContain('batman');
    });

    // componente con carga peresosa
    test('should render searchPage at /search path', async () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search']
        });
        render(<RouterProvider router={router} />);

        expect(await screen.findByTestId('search-page')).toBeDefined();

    });

    // componente con carga peresosa
    test('should render admin at /admin path', async () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/admin']
        });
        render(<RouterProvider router={router} />);

        expect(await screen.findByTestId('admin-page')).toBeDefined();

    });


    test('should redirect to homePage when unknown route', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/test']
        });
        render(<RouterProvider router={router} />);
        // screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });
});