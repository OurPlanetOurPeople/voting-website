﻿import {ReactNode, useCallback, useEffect, useState} from "react";
import "./Page.scss";
import "./HubCollection.scss";
import { getPageJson } from "../repositories/Articles/request";
import {LogException} from "../repositories/utils/utilities";
import {TArticlePage} from "../repositories/Common/types";
export interface TPage {
  header: string;
  heroImageUrl?: string;
  heroImageAltText?: string;
  richText: ReactNode;
}

export const ArticlePage = (props: TArticlePage) => {
  let { slug } = props;

  const fetchData = useCallback(async () => {
    let dataFetched = await getPageJson(slug);
    setData(dataFetched);
  }, [slug])
  
  const [data, setData] = useState<TPage>({
    header: "...",
    richText: null,
  });
  
  useEffect(() => {
    fetchData().catch(reason => {LogException(reason)});
        
  }, [slug,fetchData]);

  const styleClass = data.heroImageUrl ? "heroWithImage" : "hero";
  return (
    <>

      <div className={styleClass}>
        <h1>{data.header}</h1>
        {data.heroImageUrl ? (
          <img src={data.heroImageUrl} alt={data.heroImageAltText}></img>
        ) : null}
      </div>      

      <div>{data.richText ? data.richText : <p>...</p>}</div>

    </>
  );
};
