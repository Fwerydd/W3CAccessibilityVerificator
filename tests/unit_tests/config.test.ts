import config from '../../src/config'

describe('Given I want to retrieve my software config', () => {
    it('When I load my configuration file', async () => {
        expect(config.node_env).toBeDefined();
        expect(config.node_env).toBe(process.env.NODE_ENV);
        expect(config.port).toBeDefined();
        expect(config.port).toBe(process.env.PORT);
    });
});