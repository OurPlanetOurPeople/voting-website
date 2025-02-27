import {TVideos} from "../VotingPage";
import {Video} from "react-datocms/dist/types/VideoPlayer";
import {Choice} from "../../models";
import {TQuestionBlock} from "../../repositories/Navigation/types";
import {StructuredTextDocument} from "react-datocms";

export interface TStagedFlowProps {
    locale: string;
    videos?: TVideos;
    watchedCallBack?: () => void,
    mainVideo: { id: string, video: Video };

    voteResultCallBack?: (voted: boolean) => void,
    voteChangedCallBack?: (choice: Choice) => void,

    questions?: TQuestionBlock[];
    donateText?: { value: StructuredTextDocument };
    openingText?: { value: StructuredTextDocument };
    shareHeading?: string;

}