import {NavigationItem} from "../Navigation/types";

export interface QueryResult {
    data: Data
    errors:{}
}

export interface Data {
    videoPageCollection: SlugCollection
    blogPostCollection: SlugCollection;
    votingPageCollection: SlugCollection;
}

export interface SlugCollection {
    items: NavigationItem[]
}
