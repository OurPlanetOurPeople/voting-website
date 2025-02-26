import {TReference} from "../../components/VideoReferenceControl";

const _mainVideoReferences: TReference[] = [
    { time: 14, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1739562417-1-should-we-know.pdf" },
    { time: 26, title: "What is Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1739562418-2-what-is-hothouse-earth.pdf" },
    { time: 79, title: "The EEI", pdfLink: "https://www.datocms-assets.com/136385/1739562417-3-the-earth-energy-imbalance.pdf" }, //Getting Hotter More Quickly
    { time: 88, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1739562417-4-we-are-getting-hotter-more-quickly.pdf" },
    { time: 116, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1739562417-5-methane.pdf" },
    { time: 176, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 182, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, //176
];
/* useful for testing
const _mainVideoReferences: Reference[] = [
    { time: 4, title: "Should we know?", pdfLink: "https://www.datocms-assets.com/136385/1739562417-1-should-we-know.pdf" },
    { time: 6, title: "What is Hothouse Earth", pdfLink: "https://www.datocms-assets.com/136385/1739562418-2-what-is-hothouse-earth.pdf" },
    { time: 9, title: "The EEI", pdfLink: "https://www.datocms-assets.com/136385/1739562417-3-the-earth-energy-imbalance.pdf" }, //Getting Hotter More Quickly
    { time: 18, title: "Getting Hotter More Quickly", pdfLink: "https://www.datocms-assets.com/136385/1739562417-4-we-are-getting-hotter-more-quickly.pdf" },
    { time: 26, title: "Methane", pdfLink: "https://www.datocms-assets.com/136385/1739562417-5-methane.pdf" },
    { time: 29, title: "Human Emissions", pdfLink: "https://www.datocms-assets.com/136385/1739562417-6-the-investigation.pdf" },
    { time: 32, title: "The Investigation", pdfLink: "https://www.datocms-assets.com/136385/1739562418-7-anthropogenic.pdf" }, //176
];*/

export function getReferences(videoId?: string): TReference[]
{
    return _mainVideoReferences;
}