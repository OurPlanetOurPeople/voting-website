//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U
import {DEBUG_QUERY, getPreview} from "../utils/preview";

const blogPost = `title
            slug`;

const videoPage = `title
            slug
            video{ytembedUrl,autoPlay,title}`;

const votingPage = `title
            introVideo
            postVoteVideo`;

const basicNavItems = `
          __typename
          ... on VideoPage {
            ${videoPage}
          }
          ... on BlogPost {
            ${blogPost}
          }
              
          ... on VotingPage {
            ${votingPage}
          }`

export const QueryBlocks =
{
    BasicNavigationItems: basicNavItems,
    BlogPost: blogPost,
    VideoPost: videoPage,
    VotingPage: votingPage,
}

