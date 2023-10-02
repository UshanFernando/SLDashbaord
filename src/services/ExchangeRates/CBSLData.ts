import {CBSL_MONTHLY_EXCHANGE_RATES} from '../../constants/endpoints';
import cheerio = require('cheerio');
import ICBSLExchangeRatesData from './ICBSLExchangeRatesData.interface';
import {currencyMap} from './CurrencyMap';
import {formatDateToCBSL} from '@utils/formatDate';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadMonthlyIndicative = async (
  currency: string,
): Promise<ICBSLExchangeRatesData[]> => {
  const cacheKey = `INDICATIVE-${currency}-${
    new Date().toISOString().split('T')[0]
  }`;

  console.log('Loading Cache :: ', cacheKey);
  // Check if data is cached and not expired
  const cachedData = await AsyncStorage.getItem(cacheKey);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    return parsedData;
  }

  const formData = new FormData();
  let endDate = new Date();
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);

  console.log(formatDateToCBSL(endDate));
  console.log(currencyMap.get(currency));
  formData.append('rangeType', 'range');
  formData.append('rangeValue', '30');
  formData.append('chk_cur[]', currencyMap.get(currency) ?? 'USD');
  formData.append('submit_button', 'Submit');
  formData.append('lookupPage', 'lookup_daily_exchange_rates.php');
  formData.append('startRange', '2006-11-11');
  formData.append('txtStart', formatDateToCBSL(startDate));
  formData.append('txtEnd', formatDateToCBSL(endDate));

  const requestOptions: RequestInit = {
    method: 'POST',
    body: formData,
  };
  const response = await fetch(CBSL_MONTHLY_EXCHANGE_RATES, requestOptions);

  const htmlString = await response.text(); // get response text
  console.log('Data Fetched :: ', cacheKey);

  const $ = cheerio.load(htmlString); // parse HTML string

  // Extracting the data from the table
  const data: ICBSLExchangeRatesData[] = [];
  $('table.series tbody tr').each((index, element) => {
    const columns = $(element).find('td');
    const dateCol = $(columns[0]).text().trim();
    const value = parseFloat($(columns[1]).text().trim());
    const valueInRs = parseFloat($(columns[2]).text().trim());

    data.push({date: dateCol, value, valueInRs});
  });

  // Cache the data in AsyncStorage
  await AsyncStorage.setItem(cacheKey, JSON.stringify(data.reverse()));

  return data.reverse();
};

export {loadMonthlyIndicative};
