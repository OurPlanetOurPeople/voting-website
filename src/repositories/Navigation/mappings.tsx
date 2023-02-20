import { NavigationItem, QueryResult } from "./types";
import {
    CONTENT_URL,
    APP_CONTENTFUL_ACCESS_TOKEN,
    APP_CONTENTFUL_ENVIRONMENT,
    APP_CONTENTFUL_SPACE_ID, node_env
} from "../utils/graphQLfetch";
import {HandleErrors} from "../utils/utilities";

export const mapNavData = (root: QueryResult) => {
    HandleErrors(root);
    
  let validNavItems: NavigationItem[] = [];
  root.data.navigationGroup.navigationItemCollection.items.map(
    (navItem, index) => {
      if (!navItem) {
        console.log(`nav item ${index} was null`);
        return null;
      }
      
        validNavItems.push(navItem);
    }
  );
    
  return validNavItems;
};
