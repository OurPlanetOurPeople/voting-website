import Routing from "./Routing";
import awsconfig from './aws-exports';
import {Amplify, Analytics} from "aws-amplify";
import {localStorageVotingIdKey} from "./pages/VotingPage";
import {v4 as generateGuid} from "uuid";
import gtag from "./utils/gtag";
import {InitAnalytics} from "./utils/analytics";

Amplify.configure(
    {Logging: {
  logGroupName: 'our-people',
      logStreamName: '1-our-people',
}})

Amplify.configure(awsconfig);
InitAnalytics();

const recordPageVisit = () => {

  let localGuid = localStorage.getItem(localStorageVotingIdKey);

  if (!localGuid) {
    localGuid = generateGuid();
    localStorage.setItem(localStorageVotingIdKey, localGuid);
  }
  
   
    try {
      Analytics.record({
        name: "Site_Loaded",
        attributes: {
          word: localGuid.toString(),
        },
      });
    } catch (err) {
      console.log("Analytics Error: ", err);
    }
  
};
function App()
{
  recordPageVisit();
  return <Routing></Routing>
}
export default App;