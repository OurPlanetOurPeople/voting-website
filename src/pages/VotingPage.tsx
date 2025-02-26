import "./VotingPage.scss";
import {TQuestionBlock} from "../repositories/Navigation/types";
import React, {useCallback, useEffect, useState} from "react";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import { StructuredTextDocument} from "react-datocms";
import {useSearchParams} from "react-router-dom";
import {TVideoThumbnail} from "../repositories/VotingPage/types";
import {getVotingPageJson} from "../repositories/VotingPage/request";
import {Choice} from "../models";
import {v4 as generateGuid} from "uuid";
import { VotingPageMainJourney } from "./VotingPageVariants/VotingPageMainJourney";
import {TReference} from "../components/VideoReferenceControl";


export const localStorageVotingIdKey = "voterId";
export const localStorageWatchedIdKey = "voterWatched";


export interface TVideos
{
    detailVideo: TVideoThumbnail;
    thankYouVideo: TVideoThumbnail;
    landingVideo: TVideoThumbnail;

    prop1: TVideoThumbnail;
    prop2: TVideoThumbnail;
    prop3: TVideoThumbnail;
}

export interface TVotingPage {

    videos?:TVideos;
    donateText?: { value: StructuredTextDocument };
    openingText?: { value: StructuredTextDocument };
    heading?: string;
    introText: string;
    mainVideo: { id: string, video: Video };
    postVoteVideo?: { id: string, video: Video };
    postThankYou?: { id: string, video: Video };
    questions?: TQuestionBlock[];

    shareHeading?: string;

    shareSubHeading?: string;
    showIntroVideo: boolean;
    showSharePanel: boolean;
    showStatistics: boolean;
    videoThumbnail: { responsiveImage: { src: string } } | undefined;
    
    
}
export interface TVotingPageExtended extends TVotingPage
{
    locale: string;
    voteResultCallBack?: (voted: boolean) => void,
    voteChangedCallBack?: (choice: Choice) => void,
    watchedCallBack?: () => void,
    watched:boolean,
    voted:boolean,
}


export interface TVotingQueryProps
{
    locale:string
    id:string
}






const VotingPage = (queryProps: TVotingQueryProps) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const reset = searchParams.get("reset");
    const realVariant = searchParams.get("variant") ?? "Original";
    let variant = realVariant?.toLowerCase() ?? "";
    
    
    if(reset)
    {
        console.log("User has chosen to reset", searchParams.get("reset"));
        
        localStorage.clear()
        window.location.href = "/";        
    }
    const initialState: TVotingPage =
        {
            videos: undefined,    
            donateText: undefined,
            openingText: undefined,
            postVoteVideo: undefined,
            introText: "",
            mainVideo: {id: "", video: {}},
            showIntroVideo: false,
            showSharePanel: false,
            showStatistics: false,
            videoThumbnail: undefined,
 
        }
    const lwatchedString = localStorage.getItem(localStorageWatchedIdKey);
    const lwatched = lwatchedString ? lwatchedString === "true" : false;

    const [voted, setVoted] = useState(lwatched);
    const [watched, setWatched] = useState(false);

    const [data, setData] = useState<TVotingPage>(initialState);

    let userGuid = localStorage.getItem(localStorageVotingIdKey);

    if (!userGuid) {
        userGuid = generateGuid();
        localStorage.setItem(localStorageVotingIdKey, userGuid);
    }

    function onWatched() {
        setWatched(true);

        localStorage.setItem(localStorageWatchedIdKey, "true");
    }
    function voteChanged(choice:Choice)
    {
        console.log("show overlay")
        
    }
    
    const fullData:TVotingPageExtended = {
        locale: "",
        voteChangedCallBack: voteChanged,
        voteResultCallBack: setVoted,    
        watchedCallBack: onWatched,
        voted:voted,
        watched:watched,
        ...data

    }
    
 
    const fetchData = useCallback(async () => {

        console.log("Fetching voter data...");
        console.log("Varient is " + variant)
        let dataFetched = await getVotingPageJson(variant, queryProps.locale);

        setData(dataFetched);
    }, [queryProps,variant]);

    useEffect(() => {
        fetchData().catch(console.error);


    }, [queryProps,variant]);
       

    const RenderComponent = VotingPageMainJourney;

    return (
        <>
            <RenderComponent {...fullData}/>
            
        </>
    );  
    
};

export default VotingPage;
