import React, {useEffect, useState} from "react";
import { Col, Row } from "react-bootstrap";
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaShareAlt,
} from "react-icons/fa";

import "./SharingControls.scss";

export interface ISharingControls {
    voted: boolean;
    shareHeading: string;
    shareSubHeading?: string;
    shareButtonText?: string;
    className?: string;
    mainQuestionText?: string;
}

export const SharingControls = ({shareHeading, shareSubHeading, mainQuestionText}: ISharingControls) => {
    const [linkAdded, setLinkAdded] = useState(false);
    
    useEffect(() => {
        if (linkAdded)
            return;

        const copyLink = document.getElementById('copy-link') as HTMLLinkElement;
        if(!copyLink)
            return;

        copyLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the link's href attribute
            const link = copyLink.href;

            navigator.share({url:link, title:mainQuestionText})

        });
        setLinkAdded(true);
    })

    function record(text: string) {}

    const openSocialWindow = (url: string) => {
        const left = (window.screen.width - 570) / 2;
        const top = (window.screen.height - 570) / 2;
        const params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
        window.open(url, "NewWindow", params);
    };
    
    const handleShare = (platform: string) => {
        const pageUrl = encodeURIComponent(window.location.href);
        let url = "";

        switch (platform) {
            case "facebook":
                url = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
            break;

            case "twitter":
                url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=Check this out!`;
            break;

            case "linkedin":
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            break;

            default:
            return;
        }

        openSocialWindow(url);
    };
    
    return (
        <>
            <Row className={"verticalFrameCentre justify-content-center"}>
                <h2 style={{fontWeight: "600"}}>{shareHeading}</h2>
            </Row>

            <Row>
                <Col className={"squashToRow  sharingControls"}>
                    <div className={"verticalFrameCentre"}>
                        <div className="sharing-icons__top">
                            <button type="button">
                                <FaFacebook onClick={(e) => { e.preventDefault(); handleShare("facebook")}} style={{ fontSize: '3rem'}}/>
                                <span className="visually-hidden">Share on Facebook</span>
                            </button>

                            <button type="button">
                                <FaTwitter onClick={(e) => { e.preventDefault(); handleShare("twitter")}} style={{ fontSize: '3rem'}}/>
                                <span className="visually-hidden">Share on X</span>
                            </button>

                            <button type="button">
                                <FaLinkedin onClick={(e) => { e.preventDefault(); handleShare("linkedin")}} style={{ fontSize: '3rem'}}/>
                                <span className="visually-hidden">Share on Linkedin</span>
                            </button>
                        </div>

                        <h3 className="sharing-icons__subheading">{shareSubHeading}</h3>
                        <a id="copy-link" href="https://wwww.ourplanetourpeople.com">
                            <FaShareAlt onClick={() => record("Copy")} />
                            <span className="visually-hidden">Share with contacts</span>
                        </a>
                    </div>
                </Col>
            </Row>
        </>
    )
}