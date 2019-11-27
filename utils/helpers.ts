import Router from 'next/router';

export const isBrowser: boolean = (process as any).browser;

export const redirect = async (context: any, target: string) => {
    if (context.res) {
        context.res.writeHead(303, { Location: target });
        context.res.end();
    } else {
        await Router.push(target, target, { shallow: true });
    }
};
