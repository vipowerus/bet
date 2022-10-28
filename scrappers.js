import { load } from 'cheerio';

class SportScrapper {
    constructor($, htmlSectionQuery) {
        this.tennisGamesSections = $(htmlSectionQuery).toArray();
        this.titlesData = [];
        this.coeffsData = [];
    }

    getTitles(titlesSectionQuery) {
        this.tennisGamesSections.map((item) => {
            const $item = load(item);
            this.titlesData.push({
                'firstTeamName': $item(titlesSectionQuery).first().text(),
                'secondTeamName': $item(titlesSectionQuery).last().text(),
            });
        });
    }

    getAndPrintData(titlesSectionQuery, coeffsSectionQuery) {
        this.getTitles(titlesSectionQuery);
        this.getCoeffs(coeffsSectionQuery);
        for (let i = 0; i < this.titlesData.length; i++)
            console.log([this.titlesData[i], this.coeffsData[i]]);
    }
}

export class FootballScrapper extends SportScrapper {
    getCoeffs(coeffsSectionQuery) {
        this.tennisGamesSections.map((item) => {
            const $item = load(item);
            const coeffsArray = $item(coeffsSectionQuery).map(function(){
                return $item(this).text();
            }).get();
            this.coeffsData.push({
                'firstTeamCoeff': coeffsArray[0],
                'drawCoeff': coeffsArray[1],
                'secondTeamCoeff': coeffsArray[2],
            });
        });
    }
}

export class TennisScrapper extends SportScrapper {
    getCoeffs(coeffsSectionQuery) {
        this.tennisGamesSections.map((item) => {
            const $item = load(item);
            const coeffsArray = $item(coeffsSectionQuery).map(function(){
                return $item(this).text();
            }).get();
            this.coeffsData.push({
                'firstTeamCoeff': coeffsArray[0],
                'secondTeamCoeff': coeffsArray[1],
            });
        });
    }
}