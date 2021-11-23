import {graphqlJson} from "@/graphql";
import {Appearance} from "@/components/appearances/appearance";

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
        console.log('the response is ', response)
        return appearancesResultsToAppearances(response)
    }

}