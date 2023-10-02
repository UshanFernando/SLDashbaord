import {formatDateToCBSL} from '@utils/formatDate';
import IExchangeRateNumberLK from './INumbersLK.interface';

const fetchLocalExchangeRates = async (
  currency: string,
  date: Date,
): Promise<IExchangeRateNumberLK[]> => {
  const url = `https://cron.numbers.lk/api/exrates?currency=${currency}&date=${formatDateToCBSL(
    date,
  )}`;
  const requestOptions: RequestInit = {
    method: 'GET',
  };

  // console.log(url);

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (response.ok) {
    console.log('numbersLK Local Fetched ::', url);
    console.log(data);
    return data.data as IExchangeRateNumberLK[];
  } else {
    throw new Error(
      `Failed to fetch exchange rates. Status: ${response.status}`,
    );
  }
};

export {fetchLocalExchangeRates};
