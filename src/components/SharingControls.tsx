import {
    FaEnvelope,
    FaExternalLinkAlt,
    FaFacebook,
    FaInstagram,
    FaLink,
    FaLinkedin,
    FaShare, FaShareAlt,
    FaTwitter
} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import { Col, Row } from "react-bootstrap";
import "./SharingControls.scss";

export interface ISharingControls {
    voted: boolean;
    shareHeading: string;
    shareButtonText?: string;
    className?: string;
    mainQuestionText?: string;
}

export const SharingControls = ({className, voted, shareHeading, shareButtonText,mainQuestionText}: ISharingControls) => {
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

    let twitterShareText = "";

    try {
        twitterShareText = shareButtonText ? encodeURIComponent(shareButtonText) : "";
    } catch (e) {
        console.log(e);
    }

    const emailSubject = twitterShareText;
    return (
        <>
            <Row className={"verticalFrameCentre justify-content-center "}>
                <h2>{shareHeading}</h2>
            </Row>

            <Row>
                <Col className={"squashToRow  sharingControls"}>
                    <div className={"verticalFrameCentre"}>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//ourplanetourpeople.com" target="_blank" rel="noreferrer">
                            <FaFacebook onClick={() => record("Facebook")} style={{color: '#4267B2', fontSize: '3rem', padding: '.25rem'}}/>
                        </a>

                        <a href={`https://twitter.com/intent/tweet?text=${twitterShareText}`} target="_blank" rel="noreferrer">
                            <FaTwitter onClick={() => record("Twitter")} style={{color: '#1DA1F2', fontSize: '3rem', padding: '.25rem'}}/>
                        </a>

                        {
                            <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A//ourplanetourpeople.com" target="_blank" rel="noreferrer" className="auto-hide">
                                <FaLinkedin onClick={() => record("LinkedIn")} style={{color: '#2D62C1', fontSize: '3rem', padding: '.25rem'}}/>
                            </a>
                        }

                        <a href="https://www.instagram.com/" >
                            <FaInstagram onClick={() => record("Instagram")} style={{fontSize: '3rem', padding: '.25rem'}}/>
                        </a>

                        <a id="copy-link" href="https://wwww.ourplanetourpeople.com">
                            <FaShareAlt onClick={() => record("Copy")}
                                    style={{color: '#C0C0C0'}}/>
                        </a>
                    </div>
                </Col>
            </Row>
        </>
    )
}