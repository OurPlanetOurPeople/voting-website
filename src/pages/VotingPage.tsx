﻿import "./VotingPage.scss";
import {TQuestionBlock} from "../repositories/Navigation/types";
import React, {useCallback, useEffect, useState} from "react";
import {Video} from "react-datocms/dist/types/VideoPlayer";

import { StructuredTextDocument} from "react-datocms";

import {useSearchParams} from "react-router-dom";
import {TVideoThumbnail} from "../repositories/VotingPage/types";
import VotingPageOriginal from "./VotingPageVariants/VotingPageOriginal";
import {VariantPopup} from "./VotingPageVariants/VariantPopup";

import {VotingPageOption2} from "./VotingPageVariants/VotingPageOption2";
import {getVotingPageJson} from "../repositories/VotingPage/request";
import {Choice} from "../models";
import {v4 as generateGuid} from "uuid";
import {VotingPageOptionChris} from "./VotingPageVariants/VotingPageOptionChris";
import {VotingPageOption1} from "./VotingPageVariants/VotingPageOption1";
import {VotingPageOption3} from "./VotingPageVariants/VotingPageOption3";
import {VotingPageOption5} from "./VotingPageVariants/VotingPageOption5";
import { VotingPageOption4 } from "./VotingPageVariants/VotingPageOption4";

export const localStorageVotingIdKey = "voterId";
export const localStorageWatchedIdKey = "voterWatched";


export interface TVideos
{
    detailVideo: TVideoThumbnail;
    thankYouVideo: TVideoThumbnail;
    landingVideo: TVideoThumbnail;   
}

export interface TVotingPage {

    videos?:TVideos;
    agreeVoteText: string;

    disagreeVoteText: string;
    donateText?: { value: StructuredTextDocument };

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
            agreeVoteText: "",
            disagreeVoteText: "",
            donateText: undefined,
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
    
   
    let RenderComponent;
    switch (variant) {
        case "one":
            RenderComponent = VotingPageOption1;
            
            break;
        case "two":
            RenderComponent = VotingPageOption2;
            
            break;
        case "three":
            RenderComponent = VotingPageOption3;

            break;
        case "four":
            RenderComponent = VotingPageOption4;

            break;
        case "five":
            RenderComponent = VotingPageOption5;

            break;
        case "six": {
            RenderComponent = VotingPageOptionChris;

            variant = "original"
            break;
        }
            
        default: {
            variant = "original"
            RenderComponent = VotingPageOriginal;
        }
    }

    return (
        <>
            <RenderComponent {...fullData}/>
            <VariantPopup setSearchParams={setSearchParams} currentVariant={realVariant} />
        </>
    );  
    
};

export default VotingPage;
