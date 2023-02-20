import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import {createAnchorLinkFromTitle} from "../utils/utilities";
import {HubCollection} from "../../components/HubCollection";
import {VideoEmbed} from "../../components/VideoEmbed";
import {AssetTypes, ContentTypes} from "../Navigation/types";


function renderOptions(links) {
  // create an asset map
  const assetMap = new Map();
  // loop through the assets and add them to the map
  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

  // create an entry map
  const entryMap = new Map();
  // loop through the block linked entries and add them to the map
  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry);
  }

  // loop through the inline linked entries and add them to the map
  for (const entry of links.entries.inline) {
    entryMap.set(entry.sys.id, entry);
  }
  const entryBlockMap = entryMap;
  

  return {
    // other options...
    
    renderNode: {
      // other options...
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        //currently not an option
      },
      [BLOCKS.HEADING_2]:(node, children) =>
      {
        let text = createAnchorLinkFromTitle(children);
          return <h2 id={`${text}`}>{children}</h2>
        },
      [BLOCKS.HEADING_3]:(node, children) =>
      {
         let text = createAnchorLinkFromTitle(children);
         return <h3 id={text}>{children}</h3>
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // find the entry in the entryMap by ID
        const entry = entryBlockMap.get(node.data.target.sys.id);        

        if(entry.__typename === ContentTypes.NavigationGroup)
        {
          return <HubCollection items={entry.navigationItemCollection.items}></HubCollection>
        }
        if (entry.__typename === ContentTypes.BlogPost || entry.__typename === ContentTypes.VideoPage) {
          return (
              
                  <a href={entry.slug} className={"card"}>                    
                    <div className="card-content">                      
                      <h2>{entry.title}</h2>
                    </div></a>              
              
          );
        }
       
        if (entry.__typename === AssetTypes.YoutubeVideoEmbed) {
          // take the video url and extract the video id so we can clean it up       
          return <VideoEmbed url={entry.ytembedUrl} title={entry.title} autoplay={entry.autoPlay}></VideoEmbed>
        }
        if (entry.__typename === AssetTypes.GenericImage) {
          return <img src={entry.image.url} alt={entry.title} />;
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
        // find the asset in the assetMap by ID
        const asset = assetMap.get(node.data.target.sys.id);
        console.log("Asset found: " );
        console.log(asset);
        // render the asset accordingly     
        if(asset.url.endsWith("pdf"))
        {
          return <a href={asset.url}>See PDF: {asset.title}</a>
        }
        else
        {
          return <img src={asset.url} title={asset.title}></img>
        }          
          
      },
    },
  };
}

export const richTextToReactNode = (json, links) =>
  documentToReactComponents(json, renderOptions(links));
