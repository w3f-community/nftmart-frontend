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
export const utf8ToHex = (s: string) => {
  const utf8encoder = new TextEncoder();
  const rb: any = utf8encoder.encode(s);
  let r = '';
  //   for (const b of rb) {
  //     r += ('0' + b.toString(16)).slice(-2);
  //   }
  rb.map((b: any) => {
    r += `0${b.toString(16).slice(-2)}`;
    return '';
  });
  return r;
};
export const hexToUtf8 = (s: string) => {
  const str = s.slice(2);
  return decodeURIComponent(
    str
      .replace(/\s+/g, '') // remove spaces
      .replace(/[0-9a-f]{2}/g, '%$&'), // add '%' before each 2 characters
  );
};

// trx log
export const txLog = (result: any) => {
  console.log(`Current status is ${result.status}`);

  if (result.status.isInBlock) {
    console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
  } else if (result.status.isFinalized) {
    console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
    // unsub();
    // cb();
  }
};
