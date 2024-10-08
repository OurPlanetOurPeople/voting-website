import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {flattenNavigationRoute, LogLinks} from "../repositories/utils/utilities";

export const DynamicFooter = ({id,locale}) => {
    const [links, setLinks] = useState([]);
    const showFooter = links?.length > 0;
    const fetchData = useCallback(async () => {
        let slugs = await flattenNavigationRoute(id,locale ?? "en");
        let sentLinks = slugs.map((x) => ({link: x.slug, title: x.title}));
        setLinks(sentLinks);

        LogLinks(sentLinks)
    }, [id])

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);

    return showFooter
        ? (<footer className="bg-light">
            <ul>
                {links && links.map((x, index) => {
                    return (
                        <li key={index}>
                            <Link to={`/${x.link}`} className="nav-link">
                                {x.title}
                            </Link>
                        </li>);
                })}
            </ul>
        </footer>)
        : null
};
