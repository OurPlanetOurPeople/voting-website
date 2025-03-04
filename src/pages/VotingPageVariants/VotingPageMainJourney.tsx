﻿import React, {useEffect, useState} from "react";
import Donation from "../../components/Donation";
import {SharingControls} from "../../components/SharingControls";
import {TVotingPageExtended} from "../VotingPage";
import {Button, Col, Container, Fade, Row} from "react-bootstrap";
import {QuestionComponent} from "../../components/QuestionComponent";
import {Choice} from "../../models";
import {StructuredText} from "react-datocms";
import {TStagedFlowProps} from "./TStagedFlowProps";
import { VideoControl } from "../../components/VideoControl";
import {VideoWithReference} from "../VideoWithReference";
import { getReferences } from "../../repositories/References/request";

import "../VotingPage.scss";

const StagedFlow = (props: TStagedFlowProps) => {
    const [stage, setStage] = useState(props.stage ?? 0);
    
    const totalQuestions = 1;//(props.questions?.length ?? 0); (todo decide if we are making this dynamic)   
       
    const openingStage = 0;
    const questionStage = 1;    
    const videoStage = questionStage + totalQuestions;
    const shareStage = videoStage + 1;
    const detailStage = shareStage + 1;
    const donateStage = detailStage + 1;
    const totalStages = donateStage+1; // Number of steps in the flow
    const nextStage = () => setStage((prev) => Math.min(prev + 1, totalStages - 1));
    const prevStage = () => setStage((prev) => Math.max(prev - 1, 0));
    const originalVoteCallback = props.voteChangedCallBack;
    
    const questionOne = props.questions && props.questions.length >= 1 ? props.questions[0] : null;

    //add additional call to the callback
    const extendedVoteCallback = (voted: Choice) => {
        originalVoteCallback?.(voted); // Call the original function if it exists
         nextStage(); // Call the additional function
    };

    if(!questionOne) {
        console.log("no questions")
        return ( <></>);
    }

    return (
        <Container className="frame" style={{ position: "relative" }}>
                <div>
                    <div className="frame-content vote-controls">
                        {/* Stage Video */}
                        <Fade in={stage === videoStage} unmountOnExit>
                            <div>
                                <div className={"verticalFrameCentre"}>
                                    <VideoControl locale={props.locale} fullScreenOnClick={true}
                                            datoVideo={props.videos?.thankYouVideo?.video?.video}
                                            onFinish={() => {
                                                if (props.watchedCallBack) props.watchedCallBack();
                                                nextStage();
                                            }} 
                                            videoThumbnail={props.videos?.thankYouVideo.thumbnailImage?.responsiveImage.src}/>
                                </div>
                            </div>
                        </Fade>

                        <Fade in={stage === openingStage} unmountOnExit>
                            <div>
                                <div className={"verticalFrameCentre"} >
                                    <div style={{fontSize:"1.5rem"}}>
                                        <StructuredText data={props.openingText}/>
                                    </div>
                                </div>
                            </div>
                        </Fade>

                        {/* Stage Questions */}
                        <Fade in={stage === questionStage } unmountOnExit>
                            <Row className={"vote-controls"}>
                                <div>
                                    <QuestionComponent {...props}                                                  
                                                    {...questionOne}
                                                    voteChangedCallBack={extendedVoteCallback}/>
                                </div>
        
                                <div className={"videoColumn"}>
                                    <VideoControl locale={props.locale} fullScreenOnClick={true}
                                                datoVideo={ props.videos?.prop1?.video?.video  }
                                                        leftShift={-50}
                                                onFinish={() => {
                                                    if (props.watchedCallBack) props.watchedCallBack();
                                                    nextStage();
                                                }}
                                                videoThumbnail={ props.videos?.prop1.thumbnailImage?.responsiveImage.src} />
                                </div>
                            </Row>
                        </Fade>
                
                        {/* Stage: Sharing */}
                        <Fade in={stage === shareStage} unmountOnExit>
                            <div>
                                <div>
                                    <SharingControls voted={true} shareHeading={props.shareHeading} shareSubHeading={props.shareSubHeading} shareButtonText="Share Now" />
                                </div>
                            </div>
                        </Fade>

                        {/* Stage Details */}
                        <Fade in={stage === detailStage} unmountOnExit>
                            <div>
                                <div className={"verticalFrameCentre"}>
                                <VideoWithReference
                                    references={getReferences(props.videos?.detailVideo?.video.id)}
                                    locale={props.locale}
                                    fullScreenOnClick={true}
                                    datoVideo={props.videos?.detailVideo?.video?.video}
                                    onFinish={() => {
                                        if (props.watchedCallBack)
                                            props.watchedCallBack();
                                        nextStage();
                                    }}
                                    videoThumbnail={props.videos?.detailVideo.thumbnailImage?.responsiveImage.src}
                                    currentTimeStamp={0}/>
                                </div>
                            </div>
                        </Fade>
                        
                        {/* Stage: Donation */}
                        <Fade in={stage === donateStage} unmountOnExit>
                            <div>                           
                                <div className={"verticalFrameCentre"}>
                                    <div>
                                        <div style={{textAlign: "center" }}>
                                            <StructuredText data={props.donateText}/>
                                        </div>
                                        <Donation/>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>

                {/* Navigation Buttons 
                <div className="d-flex align-items-center justify-content-center gap-3 w-100 page-navigation">
                    <Button variant="secondary" onClick={prevStage} disabled={stage === 0}>
                        <i className="bi bi-arrow-left">←</i>
                    </Button>

                    <p className="page-navigation__number">{stage+1}/{totalStages}</p>

                    <Button variant="primary" onClick={nextStage} disabled={stage === totalStages - 1}>
                        <i className="bi bi-arrow-right">→</i>
                    </Button>
                </div>
                  */}
        </Container>
    );
};

export const VotingPageMainJourney = (props: TVotingPageExtended) => {
    const {voted, watched} = props;
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        if (voted) {
            const targetHeading = document.getElementById('share-heading');
            console.log("targetHeading 2", targetHeading);
            //targetHeading?.scrollIntoView({behavior: 'smooth'});
        }}, [showOverlay]);

    return (
        <>
           <StagedFlow {...props}></StagedFlow>
        </>
    );
};
