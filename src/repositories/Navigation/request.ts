import {QueryResult} from "./types";
import {generateNavQuery} from "./query";
import {fetchDataContentful} from "../utils/graphQLfetch";
import {mapNavData} from "./mappings";

export const getNavigationJson = (id:string) => {
  const query = generateNavQuery(id);
    
 
  return fetchDataContentful<QueryResult>(query).then((root: QueryResult) => {

     //todo handle failure outside of function
    return mapNavData(root);
  });
};

