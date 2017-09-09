function keyValueToQueryString(key, value, queryString) {
  if (typeof value === 'object') {
    const tmpQueryString = `${key}${queryString && ']'}[`;

    return `${objectToQueryString(value, `${queryString}${tmpQueryString}`)}`;
  }

  if (queryString && queryString.length) {
    return `${queryString}${key}]=${encodeURIComponent(value)}`;
  }
  return `${key}=${encodeURIComponent(value)}`;
}

function arrayToQueryString(key, values, queryString) {
  return values.map(value => keyValueToQueryString(key, value, queryString)).join('&');
}

function objectToQueryString(params, queryString = '') {
  const paramsStringArray = Object.keys(params)
    .filter(key => params[key] !== undefined)// Can be 0
    .map(key =>
      (params[key] && Array.isArray(params[key]))
        ? arrayToQueryString(key, params[key], queryString)
        : keyValueToQueryString(key, params[key], queryString));

  return paramsStringArray.join('&').replace(/%20/g, '+');
};

export default objectToQueryString;
