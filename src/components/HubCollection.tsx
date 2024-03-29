import {createAnchorLinkFromTitle, extractYoutubeVideoId} from "../repositories/utils/utilities";
import "./HubCollection.scss";
import { VideoEmbed } from "./VideoEmbed";
import { ContentTypes } from "../repositories/Navigation/types";
import {TrackedYoutubeVideo} from "../pages/TrackedYoutubeVideo";

export type THubCollection = {
  items: []
  title?: string;
  showVideoThumbNails: boolean
  parentTitle?: string;
  pageTitle?:string;
  uniqueKey?: string;
};

export type THubCard =
  {
    cardTitle: string;
    pageTitle: string;
    link: string;
    uniqueKey: string;
  }
export type TVidoHubCard = THubCard &
{
  videoTitle: string;
  videoUrl: string;
}
export const HubCard = (props: THubCard) => {
  const title = props.cardTitle;
  const breakPoint = 40;
  const scaleFactor = 70;
  const overrideFontSize = (title.length > breakPoint);
  let overrideFontSizeTo = "";
  if (overrideFontSize) {
    let dynamicSize = (scaleFactor / title.length);
    overrideFontSizeTo = `${dynamicSize}rem`;
  }
  return (
    <a href={props.link} className={"card"} key={props.uniqueKey}>
      <div className="card-content">
        {overrideFontSize
          ? <h2 font-overridded={overrideFontSize} style={{ fontSize: overrideFontSizeTo }}>{title}</h2>
          : <h2>{title}</h2>}
      </div>
    </a>)
}
export const VideoHubCard = (props: TVidoHubCard) => {
  return (
    <div className="card video-card">
      <div className="card-content" key={props.uniqueKey}>
        <a href={props.link}><h2>{props.cardTitle}</h2></a>
        <TrackedYoutubeVideo
            videoId={extractYoutubeVideoId(props.videoUrl)}
            autoPlay={false}
            showFrame={false}
            pageTitle={props.pageTitle} 
            
            videoTitle={props.videoTitle}/>
      </div>
    </div>)
}
export const HubCollection = (props: THubCollection) => {
  let subHubCollections: any[] = [];
  let mainHubCards: any[] = [];
  createHubCards(props.items);
  const pageTitle = props.pageTitle ?? props.parentTitle ?? "hub_page";
 
  
  function createHubCards(items: []) {
    if (!items)
      return [];
    const pageTitle = props.pageTitle ?? props.parentTitle ?? "hub_page";
    items.forEach((x: any, i) => {
      let link = x.slug ?? `#${createAnchorLinkFromTitle(x.title)}`;
      const key = `${x.title}-card-${i}`;
      
      switch (x.__typename) {
        case ContentTypes.NavigationGroup:
          //add card that will link to new hub
          mainHubCards.push(
            <HubCard pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key} />
          )
          //create a new hub at the bottom

          subHubCollections.push(<HubCollection pageTitle={pageTitle} showVideoThumbNails={x.showVideoThumbnailsInHub ?? false} parentTitle={props.title} title={x.title} items={x.navigationItemCollection?.items} uniqueKey={"subhub"+key} />)
          break;
        case ContentTypes.VideoPage:

          if (props.showVideoThumbNails) {
            mainHubCards.push(
              <VideoHubCard pageTitle={pageTitle} cardTitle={x.title} link={link} videoTitle={x.video.title}
                            videoUrl={x.video.ytembedUrl} uniqueKey={key} />
            )
          }
          else {
            mainHubCards.push(
              <HubCard pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key} />
            )
          }
          break; 
          case ContentTypes.VotingPage:
            mainHubCards.push(
                <HubCard pageTitle={pageTitle} cardTitle={x.cardTitle} link={link} uniqueKey={key} />
            )
            break;
        default:
          mainHubCards.push(
            <HubCard pageTitle={pageTitle} cardTitle={x.title} link={link} uniqueKey={key} />
          )
          break;
      }
    })

  }
  //  const title = props.parentTitle ? props.title + ": " + x.title : x.title;
  
  return (
    <div className="hub" key={props.uniqueKey ? `${props.title}-${props.uniqueKey}` : `${props.parentTitle}-${props.title}`} >
      {props.parentTitle ? <h2>{props.parentTitle}:</h2> : null}
      {props.title ? <h2 id={createAnchorLinkFromTitle(props.title)}>{props.title}</h2> : null}
      {mainHubCards}
      {subHubCollections}
    </div>);
}