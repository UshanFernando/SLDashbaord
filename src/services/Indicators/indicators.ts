import cheerio = require('cheerio');
import IIndicators from './Indicators.interface';

const loadInflationData = async () => {
  const searchUrl = `https://www.cbsl.gov.lk/cbsl_custom/inflation/inflationwindow.php`;
  const response = await fetch(searchUrl); // fetch page

  const htmlString = await response.text(); // get response text
  const $ = cheerio.load(htmlString); // parse HTML string

  const data: IIndicators[] = [];

  $('table tr').each((i, row) => {
    if (i === 0) {
      return;
    } // Skip the header row

    const columns = $(row).find('td');
    const date = $(columns[0]).text().trim();
    const colomboHeadlineInflation = parseFloat($(columns[1]).text().trim());
    const colomboCoreInflation = parseFloat($(columns[2]).text().trim());
    const nationalHeadlineInflation = parseFloat($(columns[3]).text().trim());
    const nationalCoreInflation = parseFloat($(columns[4]).text().trim());

    data.push({
      date,
      colomboHeadlineInflation,
      colomboCoreInflation,
      nationalHeadlineInflation,
      nationalCoreInflation,
    });

    console.log(JSON.stringify(data));
  });
};

export {loadInflationData};
