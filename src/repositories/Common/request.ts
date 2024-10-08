import {fetchDataDato} from "../utils/graphQLfetch";
import {QueryResult} from "./types";
import {NavigationItem} from "../Navigation/types";
import {LogErrors} from "../utils/utilities";
import {QueryBlocks} from "./query";


function generateAllPagesQuery() {
    const query = `query pageQuery {
      allBlogPostModels {
       __typename
       ${QueryBlocks.BlogPost}  	
    
  }
  allVideoPageModels{
         __typename
      ${QueryBlocks.VideoPost}  	
    
  }
  votingPageModel{
    
    __typename
    
  	  ${QueryBlocks.VotingPage}  		 

    
  }
}`
    return query;
}

function mapAllSlugs(root: QueryResult): NavigationItem[] {
    return root?.data?.allVideoPageModels
        .concat(root.data.allBlogPostModels)
        .concat(root.data.votingPageModel);
}

export const getAllNavData = () => {
    const query = generateAllPagesQuery();
    return fetchDataDato<QueryResult>(query).then((root: QueryResult) => {

       
        if (root.errors) {
            console.log(root.errors)
            LogErrors(root.errors)
        }

        return mapAllSlugs(root); //todo handle failure outside of function

    });
};