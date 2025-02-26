import React, {useEffect, useState} from "react";
import { ListGroup } from "react-bootstrap";
import "./VideoControl.scss"
import "./VideoReferenceControl.scss"
export type TReferenceProps = {
    currentTimeStamp: number,
    references?: TReference[]
}

export type TReference = {
    time: number;
    title: string;
    pdfLink: string;
}



export const VideoReferenceControl = ({currentTimeStamp, references}: TReferenceProps) => {


    if(!references || references.length < 1) {
        return <></>
    }
    //sort the references so that they are in reverse time order (this ensures the latest is at the top)
    const allReferences =references.sort((a, b) => b.time - a.time);

    function showReference(index:number):boolean
    {
        //invalid references can't be shown :) 
        if(index >= allReferences.length || index < 0)
            return false;

        const reference = allReferences[index];
        return reference.time <= currentTimeStamp
    }
    
    return (
        <ListGroup style={{ overflowY: "auto", overflowX:"hidden"}}> {/* Use ListGroup for better styling */}
            {allReferences.map((ref, indexA) => {

                const isVisible = showReference(indexA);
                const nextReferenceIsVisible = showReference(indexA - 1);
                const isTheFirstVisible = isVisible && !nextReferenceIsVisible;
                const isHighlighted = isTheFirstVisible;//  && ((currentTimeStamp - ref.time) < highlightTime); 


                const newStyle = {
                    display: isVisible ? "inline-flex" : "none",
                };

                return (
                    <ListGroup.Item
                        key={ref.time}
                        className={`text-left list-group-item-text ${isHighlighted ? "current-reference" : "other-reference"}`}
                        action // Makes the items clickable
                        style={newStyle}
                        active={isHighlighted} // Sets active state
                        onClick={() => {                        
                            window.open(ref.pdfLink, "_blank");
                        }}
                    >
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>
                    {ref?.title}
                    </ListGroup.Item> 
                )
            })}
        </ListGroup>
    );
}