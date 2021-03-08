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
