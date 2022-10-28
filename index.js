import { load } from 'cheerio';
import { readFile } from 'fs';
import { FootballScrapper, TennisScrapper} from './scrappers.js'


setInterval(getDataUpdates, 0.5 * 1000);

function getDataUpdates () {

    readFile('bet.html', function (err, html) {
        if (err) throw err;

        const $ = load(html);

        $('div.him-Classification').toArray().map(element => {
            let $item = load(element);
            if ($item('div.him-Header_Text').text() === 'Tennis') {
                let tennisProcessor = new TennisScrapper($item, 'div.him-Fixture_Container');
                tennisProcessor.getAndPrintData('div.him-DetailsWithIndicators_Team', 'span.hip-OddsOnly_Odds');
            }
            if ($item('div.him-Header_Text').text() === 'Voetbal') {
                let footballProcessor = new FootballScrapper($item, 'div.him-Fixture_Container');
                footballProcessor.getAndPrintData('div.him-DetailsTwoWay_TeamName', 'span.hip-OddsOnly_Odds');
            }
        });
    });
}
