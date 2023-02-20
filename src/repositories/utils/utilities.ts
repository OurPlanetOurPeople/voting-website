import {
    APP_CONTENTFUL_ACCESS_TOKEN,
    APP_CONTENTFUL_ENVIRONMENT,
    APP_CONTENTFUL_SPACE_ID,
    CONTENT_URL,
    node_env
} from "./graphQLfetch";
import {ContentTypes, NavigationItem} from "../Navigation/types";
import {getNavigationJson} from "../Navigation/request";

export function createAnchorLinkFromTitle(link:string) :string
{
    let text = `${link}`;
    text = text.trim().toLowerCase();
    text = text.replace(" ", "-");
    return text;
}

export const extractYoutubeVideoId = (fullUrl?: string): string => {
    if (!fullUrl) return "Invalid Video";

    //this way someone can add a "watch/embed/share/the id" yt link and it will still work
    const youtubeId = fullUrl.slice(-11);

    return youtubeId;
};

export const extractYoutubeVideoUrl = (video: string, autoPlay: boolean = false): string => {
    let videoId = extractYoutubeVideoId(video);
    let autoPlayUrl = autoPlay ? 1 : 0;
    let videoUrl = `https://www.youtube.com/embed/${videoId}?&autoplay=${autoPlayUrl}`;
    return videoUrl;
};
export function HandleErrors(result:any) {
    if (result.errors) {
        console.log("Errors reported:");
        console.log(result.errors);
        console.log("Space Id:" + APP_CONTENTFUL_SPACE_ID);
        console.log("Token:" + APP_CONTENTFUL_ACCESS_TOKEN);
        console.log("environment:" + APP_CONTENTFUL_ENVIRONMENT);
        console.log("system environment:" + node_env);
        console.log("url:" + CONTENT_URL);
    }
}

export async function flattenNavigationRoute(
    id: string
): Promise<NavigationItem[]> {

    let dataFetched = await getNavigationJson(id);
    let childIds: string[] = dataFetched
        .filter((x) => x.__typename == ContentTypes.NavigationGroup)
        .map((x) => x.sys?.id ?? "INVALID")
        .filter((x) => x != "INVALID");
    for (const childId of childIds) {
        dataFetched = dataFetched.concat(await flattenNavigationRoute(childId));
    }
    return dataFetched;
}