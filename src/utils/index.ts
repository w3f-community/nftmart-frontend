import BigNumber from 'bignumber.js';

type NumberValue = string | number;

export const parseQuery = (search: string) => {
  const query = search.substring(1);
  const vars = query.split('&');
  const queryMap: Record<string, string> = {};
  for (let i = 0; i < vars.length; i += 1) {
    const [key, value] = vars[i].split('=');
    queryMap[key] = value;
  }
  return queryMap;
};

export const toBigNumber = (n: NumberValue) => new BigNumber(String(n));

export const toFixedDecimals = (n: NumberValue, place = 8) => toBigNumber(n).toFormat(place);

export default {};
