import {useCallback, useEffect, useState} from "react";
import "./Page.scss";

import {getVideoPageJson} from "../repositories/VideoPage/request";
import {TArticlePage} from "../repositories/Common/types";
import {Video} from "react-datocms";
import {TVideoProps} from "../components/VideoControl";
import {TReference, TReferenceProps} from "../components/VideoReferenceControl";
import {VideoWithReference} from "./VideoWithReference";
import {getReferences} from "../repositories/References/request";

export interface TVideoPage {
    mainVideo: { id: string, video:{video: Video | undefined} } | undefined;
    header: string
    introText?: string;
    videoTitle?: string;
    videoThumbnail?: string;

}
function getLastSlugPart(slug: string, separator: string = '/'): string | undefined {
    if (!slug) {
        return undefined; // Handle empty or null slugs
    }
    const parts = slug.split(separator);
    return parts.pop();
}



export const VideoPage = (props: TArticlePage) => {
    let {slug, locale} = props;

    const fetchData = useCallback(async () => {
        var videoName = getLastSlugPart(slug);
        let dataFetched = await getVideoPageJson(videoName ?? "", locale);

        setData(dataFetched);
    }, [slug])

    const [data, setData] = useState<TVideoPage>({
        header: "",
        videoTitle: "UnknownVideo",
        mainVideo:  undefined,
        introText: "",
    });
    
   
    
    useEffect(() => {
        fetchData().catch(console.error);


    }, [slug, fetchData]);

    return (
        <>
            <h1>{data.header}</h1>  
            {data.introText ? <p className="introText">{data.introText}</p> : null}

            <VideoWithReference currentTimeStamp={0} references={getReferences(data.mainVideo?.id)} locale={locale} fullScreenOnClick={false} datoVideo={data?.mainVideo?.video?.video ?? undefined} pageTitle={props.title}
                                videoTitle={data.videoTitle} videoThumbnail={data.videoThumbnail} ></VideoWithReference>
        </>
    );
};
