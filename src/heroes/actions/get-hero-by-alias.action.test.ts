
import { describe, expect, test } from 'vitest'
import { getHeroByAliasAction } from './get-hero-by-alias.action';
// import { heroResponseMock } from '../../../test/mocks/hero.response.data'

describe('getHero action', () => {

    // let axiosMock = new AxiosMockAdapter(heroApi);
    // beforeEach(() => {
    //     // axiosMock.reset(); // limpia el estado del mock
    //     axiosMock = new AxiosMockAdapter(heroApi);
    // });

    test('should fetch hero data and return with complete image url', async () => {

        const idSlug = 'clark-kent';
        // axiosMock.onGet(`/${idSlug}`).reply(200, heroResponseMock);

        // const hero = await getHeroByAliasAction(idSlug);
        // // console.log(hero);
        // expect(hero.id).toBeDefined();
        // expect(hero.image).contain('http');

        const response = await getHeroByAliasAction(idSlug);
        console.log(response);
        expect(response).toStrictEqual({
            id: '1',
            name: 'Clark Kent',
            slug: 'clark-kent',
            alias: 'Superman',
            powers: [
                'Súper fuerza',
                'Vuelo',
                'Visión de calor',
                'Visión de rayos X',
                'Invulnerabilidad',
                'Súper velocidad'
            ],
            description: 'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
            strength: 10,
            intelligence: 8,
            speed: 9,
            durability: 10,
            team: 'Liga de la Justicia',
            image: 'http://localhost:3001/images/1.jpeg',
            firstAppearance: '1938',
            status: 'Active',
            category: 'Hero',
            universe: 'DC'
        });
        expect(response.image).toContain('http');

    });

    test('should throw an error if hero es not found', async () => {
        const idSlug = 'clark-kentX';
        // axiosMock.onGet(`/${idSlug}`).reply(404, heroErrorMock);

        // const hero = await getHeroByAliasAction(idSlug);
        // console.log(hero);
        // expect(hero.status).toBe('404');

        const result = await getHeroByAliasAction(idSlug).catch(error => {
            expect(error).toBeDefined();
            expect(error.status).toBe(404);
        });
        expect(result).toBeUndefined();
        // console.log(response);
        // expect(response.statusCode).toBe(404);
    });
});