//generate by
//https://app.contentful.com/spaces/fojlfyn3xufg/environments/staging/entries/1n9FMvYa8MWstVI19atW2w
//graphqlplayground

import {DEBUG_QUERY, getPreview} from "../utils/preview";
import {navigationGroup} from "../Navigation/query";
import {QueryBlocks} from "../Common/query";

export function generatePostQuery(slug: string) {

 
  const isPreview = getPreview();
  const query = `query blogPostCollectionQuery{
    blogPostCollection(limit: 1, where: {slug: "${slug}"}, preview:${isPreview}) {
      items {
        sys {
          id
        }
        title,       
        author{name,image{title,url}}
        slug    
        image{title,url,description}
        body {
          json
          
          links {
            entries {
              inline {
                sys {
                  id
                }
                __typename
                ... on BlogPost {
                  ${QueryBlocks.BlogPost}
                }
              }
              block {
                sys {
                  id
                }
                __typename
            
                ... on  BlogPost{                  
                  ${QueryBlocks.BlogPost}
                }
          
                 ... on  GenericImage{
                  __typename
                  image{url}
                  title
                  
                }
                ... on  NavigationGroup{
                  __typename                 
                  title
                  ${navigationGroup}
                }
                ... on  YoutubeVideoEmbed{
                  __typename
                  ytembedUrl
                  title
                  autoPlay
                  
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                url
                title
                width
                height
                description
              }
            }
          }
        }
      }
    }
  }
`;
  if(process.env.NODE_ENV == "development" && DEBUG_QUERY) console.log(query);
 
  return query;
}
