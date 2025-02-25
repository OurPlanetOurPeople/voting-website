﻿import "../VotingPage.scss";

import Donation from "../../components/Donation";
import React, {useEffect, useState} from "react";
import {VideoControl} from "../../components/VideoControl";
import {SharingControls} from "../../components/SharingControls";
import {TVotingPageExtended} from "../VotingPage";
import {Button, Container, Fade} from "react-bootstrap";
import {QuestionComponent} from "../../components/QuestionComponent";
import {Choice} from "../../models";
import {StructuredText} from "react-datocms";
import {TStagedFlowProps} from "./TStagedFlowProps";

const StagedFlow = (props: TStagedFlowProps) => {
    const [stage, setStage] = useState(0);
    
    const totalQuestions = (props.questions?.length ?? 0);
    
       
    
    const questionStage = 0;    
    const videoStage = questionStage + totalQuestions;
    const shareStage = videoStage + 1;
    const detailStage = shareStage + 1;
    const donateStage = detailStage + 1;
    const totalStages = donateStage+1; // Number of steps in the flow
    const nextStage = () => setStage((prev) => Math.min(prev + 1, totalStages - 1));
    const prevStage = () => setStage((prev) => Math.max(prev - 1, 0));
    const originalVoteCallback = props.voteChangedCallBack;
    //add additional call to the callback

    const extendedVoteCallback = (voted: Choice) => {
        originalVoteCallback?.(voted); // Call the original function if it exists
         nextStage(); // Call the additional function
    };
    return (
        <Container className="d-flex flex-column align-items-center justify-content-between mt-3"
                   style={{ minHeight: "70vh", position: "relative" }} // Ensures height consistency
        
        >


            <div className="frame flex-grow-1 d-flex flex-column align-items-center justify-content-center w-100">
                <div className="frame-content vote-controls" style={{height:'400px'}}>
                    {/* Stage Video */}
                    <Fade in={stage === videoStage} unmountOnExit>
                        <div>
                            <VideoControl locale={props.locale} fullScreenOnClick={true}
                                          datoVideo={props.videos?.thankYouVideo?.video?.video}
                                          onFinish={() => {
                                              if (props.watchedCallBack) props.watchedCallBack();
                                              nextStage();
                                          }}
                                          videoThumbnail={props.videos?.thankYouVideo.thumbnailImage?.responsiveImage.src}/>

                        </div>
                    </Fade>

                    {/* Stage Questions */}
                    {props.questions?.map((question, index) =>(
                        <Fade in={stage === questionStage + index} unmountOnExit>
                            <div>
                                <QuestionComponent {...props}
                                                   {...question}
                                                    voteChangedCallBack={extendedVoteCallback}/>
                            </div>
                        </Fade>
                        ))
                    }

                    {/* Stage: Sharing */}
                    <Fade in={stage === shareStage} unmountOnExit>
                        <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        <div>
                            <SharingControls voted={true} shareHeading="Share this!" shareButtonText="Share Now"/>

                        </div>
                        </div>
                    </Fade>

                    {/* Stage Details */}
                    <Fade in={stage === detailStage} unmountOnExit>
                        <div>
                            <VideoControl locale={props.locale} fullScreenOnClick={true}
                                          datoVideo={props.videos?.thankYouVideo?.video?.video}
                                          onFinish={() => {
                                              if (props.watchedCallBack) props.watchedCallBack();
                                              nextStage();
                                          }}
                                          videoThumbnail={props.videos?.thankYouVideo.thumbnailImage?.responsiveImage.src}/>

                        </div>
                    </Fade>
                    
                    {/* Stage: Donation */}
                    <Fade in={stage === donateStage} unmountOnExit>
                        <div>                           

                                <div style={{textAlign: "center"}}>
                                    <StructuredText data={props.donateText}/>
                                </div>
                                <Donation/>
                          
                        </div>
                    </Fade>
                </div>
            </div>
            {/* Navigation Buttons */}
            <div  className="d-flex justify-content-center gap-3 w-100"
                  style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: 0,
                      right: 0,
                      textAlign: "center"
                  }}>
                <Button variant="secondary" onClick={prevStage} disabled={stage === 0}>
                    <i className="bi bi-arrow-left">←</i>
                </Button>
                <p> {stage+1}/{totalStages}</p>
                <Button variant="primary" onClick={nextStage} disabled={stage === totalStages - 1}>
                    <i className="bi bi-arrow-right">→</i>
                </Button>
            </div>
        </Container>
    );
};


export const VotingPageOption1 = (props: TVotingPageExtended) => {


    const {voted, watched} = props;

    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {

        if (voted) {
            const targetHeading = document.getElementById('share-heading');
            console.log("targetHeading 2", targetHeading);
            //targetHeading?.scrollIntoView({behavior: 'smooth'});
        }


    }, [showOverlay]);

    return (
        <>
           <StagedFlow {...props}></StagedFlow>

        </>
    )
        ;
};


