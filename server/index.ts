import express from 'express';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';
import nextI18next from '../i18n';

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const start = async () => {
    await app.prepare();
    const server = express();

    try {
        await server.use(nextI18NextMiddleware(nextI18next));
    } catch (e) {
        throw (e);
    }

    server.get('*', (req: any, res: any) => handle(req, res));

    await server.listen(port, () => {
        console.log(`Ready on http://localhost:${port}!`);
    });
};
start();

export default start;
