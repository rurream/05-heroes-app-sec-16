import { beforeEach, describe, expect, test } from "vitest";
import { heroApi } from "../api/hero.api";
import AxiosMockAdapter from 'axios-mock-adapter'
import { getHeroesByPageAction } from "./get-heroes-by-page.action";

const BASE_URL = import.meta.env.VITE_API_URL;

describe('getHeroesByPageAction', () => {

    let heroesApiMock = new AxiosMockAdapter(heroApi);
    beforeEach(() => {
        // heroesApiMock.reset(); // limpia el estado del mock
        heroesApiMock = new AxiosMockAdapter(heroApi);
        // heroesApiMock.resetHistory();
    });

    test('should return default heroes', async () => {
        heroesApiMock.onGet(`/`).reply(200, {
            total: 10,
            pages: 1,
            heroes: [
                { image: `1.jpeg`, },
                { image: `2.jpeg`, }
            ]
        });

        const response = await getHeroesByPageAction(1);

        expect(response).toStrictEqual({
            total: 10,
            pages: 1,
            heroes: [
                { image: `${BASE_URL}/images/1.jpeg` },
                { image: `${BASE_URL}/images/2.jpeg` }
            ]
        })
    });

    test('should return the correct heroes when page is not a number', async () => {
        heroesApiMock.onGet(`/`).reply(200, {
            total: 10,
            pages: 1,
            heroes: []
        });

        await getHeroesByPageAction('a' as unknown as number);
        const request = heroesApiMock.history;
        // console.log(request);
        expect(request[0].params.offset).toBe(0);
        // expect(response).toStrictEqual({
        //     total: 10,
        //     pages: 1,
        //     heroes: []
        // })
    })

    test('should return the correct heroes by page', async () => {
        heroesApiMock.onGet(`/`).reply(200, {
            total: 10,
            pages: 1,
            heroes: []
        });

        await getHeroesByPageAction('5' as unknown as number);
        const request = heroesApiMock.history;

        expect(request[0].params.offset).toBe(24);
    })
});