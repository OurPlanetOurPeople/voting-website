import {QueryResult} from "./types";

import votingPage, {TVotingPage} from "../../pages/VotingPage";
import {extractYoutubeVideoId} from "../utils/utilities";

export async function mapVotingPage(result: QueryResult): Promise<TVotingPage> {

    
    const votingPage = result?.data?.votingPageModel;
    

    if (!votingPage) {
        throw new Error("no voting data");
    }
    const data:TVotingPage =
        {
            agreeVoteText: votingPage.agreeVoteText,
            disagreeVoteText: votingPage.disagreeVoteText,        
            donateText: votingPage.donateText,
            heading: votingPage.heading,
            introText: votingPage.introductionText ?? "",
            mainVideo: votingPage.mainVideo,
            postVoteVideo: votingPage.postVoteVideo,
            questions: votingPage.questions,
            shareHeading: votingPage.shareHeading,
            shareSubHeading: votingPage.shareSubHeading,
            showIntroVideo: true,
            showSharePanel: true,
            showStatistics: votingPage.showVoteStatistics ?? false,
            videoThumbnail: votingPage.videoThumbnail

        }

    return data;
}