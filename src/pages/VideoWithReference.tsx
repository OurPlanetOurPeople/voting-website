import {useRef, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {TVideoProps, VideoControl} from "../components/VideoControl";
import {TReferenceProps, VideoReferenceControl} from "../components/VideoReferenceControl";

import "./VideoWithReference.scss";

type TVideoReference = TReferenceProps & TVideoProps;

export const VideoWithReference = (props: TVideoReference) => {

    const [timeStamp, setTimeStamp] = useState<number>(props.currentTimeStamp);

    //if no references just treat as normal control
    if(!props.references || props.references.length === 0){
        return <VideoControl {...props} onProgress={setTimeStamp}  />
    }
    
    return (
        <div className="video-reference-container">
            <div className="video-container">
                <VideoControl {...props} onProgress={setTimeStamp}  />
            </div>

            <div className="reference-container">
                <VideoReferenceControl currentTimeStamp={timeStamp} references={props.references} />
            </div>
        </div>
    )
}