import { NextPageContext as NPC } from 'next';

export interface NextPageContext extends NPC {
    apolloClient: any;
}
