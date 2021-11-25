import {graphqlJson} from "@/graphql";
import {Appearance} from "@/appearance";

function appearancesResultsToAppearances(data) {
    return data.map(r => {
        const numberSinceEpoch = Date.parse(r['startDate'])
        const date = new Date(numberSinceEpoch)
        return new Appearance(date, r['title'], r['marketingBlurb']);
    });
}


export class AppearanceService {

    async appearances() {
        const graphqlQuery = ` 
            query  {
                appearances { 
                    event
                    time
                    startDate
                    endDate
                    marketingBlurb
                }
            }
        `
        const response = (await graphqlJson(graphqlQuery, {}))['data']['appearances']
        return appearancesResultsToAppearances(response)
    }

}