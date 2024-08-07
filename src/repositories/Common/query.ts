//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground
//2EASI81WCZEAsg9bRP370U

const blogPost = `title
            slug`;

const videoPage = `title
            slug
            video{ytembedUrl,autoPlay,title}`;

const votingPage = ` 
            cardTitle,          
            introductionText,
            showVoteStatistics,
            heading,
            introVideo,
            votingThankYou,
            votingPostVoteExplanation,
            shareHeading,
            shareSubHeading,
            slug,
            postVoteVideo
            questions {
                ... on QuestionRecord { questionTitle, id}
            }

            `;

const basicNavItems = `
          __typename
          ... on VideoPageModelRecord {
            ${videoPage}
          }
          ... on BlogPostModelRecord {
            ${blogPost}
          }
              
          ... on VotingPageModelRecord{
            ${votingPage}
          }`

export const QueryBlocks =
{
    BasicNavigationItems: basicNavItems,
    BlogPost: blogPost,
    VideoPost: videoPage,
    VotingPage: votingPage,
}

