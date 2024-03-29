export interface QueryResult {
    data: Data
    errors:{}
}

export interface Data {
    navigationGroup: NavigationGroup
}

export interface NavigationGroup {
    navigationItemCollection: NavigationItemCollection
}

export interface NavigationItemCollection {
    items: NavigationItem[]
}

export enum ContentTypes {
    VotingPage = "VotingPage",
    BlogPost = "BlogPost",
    VideoPage = "VideoPage",
    NavigationGroup = "NavigationGroup",
    ExternalLink = "ExternalLink",   
    
}
export enum AssetTypes
{
    YoutubeVideoEmbed = "YoutubeVideoEmbed",
    GenericImage =  "GenericImage",
}

export interface BasePage
{
    __typename: ContentTypes
    slug: string
    title: string
}
export interface VideoPage extends BasePage
{
    url?:  string
}

export interface NavigationItem {
    __typename: ContentTypes 
    showVideoThumbnailsInHub?: boolean
    introVideo?: string
    cardTitle?:string;
    postVoteVideo?: string
    heading?: string;
    showVoteStatistics?: boolean;
    introductionText?: string;
    votingThankYou?: string;
    votingPostVoteExplanation?: string;
    shareHeading?: string;
    shareSubHeading?: string;
    title?: string   
    url?:  string
    slug?: string
    sys?: Sys
}

export interface Sys {
    id: string
}
