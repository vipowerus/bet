import { load } from 'cheerio';
import { readFile } from 'fs';

readFile('', function (err, html) {
    if (err) throw err;

    const $ = load(html);

    $('div.gl-MarketGrid-wide div.fh-MarketGroupFixture_InnerContainer').toArray().
        map((item) => {
            const $item = load(item);
            console.log('{');
            console.log('"firstTeamImage": ' + $item('img').first().attr('src'));
            console.log('"firstTeamName": ' + $item('div.fh-ParticipantFixtureTeamSoccer_TeamName').first().text());
            console.log('"secondTeamImage": ' + $item('img').last().attr('src'));
            console.log('"secondTeamName": ' + $item('div.fh-ParticipantFixtureTeamSoccer_TeamName').last().text());

            const coeffsArray = $item('span.fh-ParticipantFixtureOdd_Odds').map(function(){
                return $item(this).text();
             }).get();
            console.log('"firstTeamCoeff": ' + coeffsArray[0]);
            console.log('"drawTeamCoeff": ' + coeffsArray[1]);
            console.log('"secondTeamCoeff": ' + coeffsArray[2]);
            console.log('}');

    });
});