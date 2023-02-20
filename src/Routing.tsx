import {useEffect, useState} from "react";

import "./App.scss";
import Layout from "../src/pages/Layout";
import {ContentTypes, NavigationItem} from "./repositories/Navigation/types";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import VotingPage from "./pages/VotingPage";
import {ArticlePage} from "./components/Page";
import MemberArea from "./pages/MemberArea";
import NoPage from "./pages/NoPage";
import LoadingPage from "./pages/LoadingPage";
import {DEBUG_QUERY, refreshPreview} from "./repositories/utils/preview";
import {extractYoutubeVideoId} from "./repositories/utils/utilities";
import {VideoPage} from "./components/VideoPage";
import {getAllNavData} from "./repositories/Common/request";

export const headerComponentId = "2EASI81WCZEAsg9bRP370U";
export const footerComponentId = "4NIP2EIoA7na6BuwxArtLi";

function Routing() {
  async function fetchData() {
    let links = await getAllNavData(); //todo we should probably just split this into the 3 arrays, save switching on typename below
    if(process.env.NODE_ENV === "development" && DEBUG_QUERY) 
    {
      console.log("Fetching routing data");
      console.log(links);
    }
    setData(links);
    setDataLoaded(true);
  }

  const [data, setData] = useState<NavigationItem[]>();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [voted, setVoted] = useState(false);
  
  refreshPreview();
  
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  
  const createDynamicRoutes = () => {
    return (
      <>
        {data &&
          data.map((navItem, index) => {
            switch (navItem.__typename) {
              case ContentTypes.VotingPage:
                return (
                  <Route
                    key={index}
                    index
                    element={
                      <VotingPage
                        introVideoId={extractYoutubeVideoId(navItem.introVideo)}
                        postVoteVideoId={extractYoutubeVideoId(
                          navItem.postVoteVideo
                        )}
                        title={navItem.title ?? ""}
                        showIntroVideo={!voted}
                        showSharePanel={voted}
                        voted={voted}
                        setVoted={setVoted}
                      />
                    }
                  />
                );
        
              case ContentTypes.BlogPost:
                
                return (
                  <Route
                    key={index}
                    path={navItem.slug ?? "blog"}
                    element={<ArticlePage slug={navItem.slug ?? "blog"} />}
                  />
                );
              case ContentTypes.VideoPage:
                return (
                    <Route
                        key={index}
                        path={navItem.slug ?? "video"}
                        element={<VideoPage slug={navItem.slug ?? "video"} />}
                    />
                );

              default:
                return null;
            }
          })}
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {createDynamicRoutes()}
          <Route
            path="memberArea"
            element={<MemberArea signOut={null} user={null} />}
          />
          {dataLoaded ?  <Route path="*" element={<LoadingPage />} /> : <Route path="*" element={<NoPage />} />}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
