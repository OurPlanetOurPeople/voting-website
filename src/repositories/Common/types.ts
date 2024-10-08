import {NavigationItem} from "../Navigation/types";

export interface QueryResult {
    data: Data
    errors: {}
}

export interface Data {
    allVideoPageModels: NavigationItem[]
    allBlogPostModels: NavigationItem[];
    votingPageModel: NavigationItem;
}

export type TArticlePage = {
    slug: string;
    title?: string;
    locale:string;
};


