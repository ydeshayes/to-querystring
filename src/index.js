function keyValueToQueryString(key, value, queryString, isArray, options) {
  const arrayPrefix = isArray ? options.arrayPrefix || '' : '';

  if (typeof value === 'object') {
    const tmpQueryString = `${key}${arrayPrefix}${queryString && ']'}[`;

    return `${objectToQueryString(value, `${queryString}${tmpQueryString}`, options)}`;
  }

  if (queryString && queryString.length) {
    return `${queryString}${key}]${arrayPrefix}=${encodeURIComponent(value)}`;
  }

  return `${key}${arrayPrefix}=${encodeURIComponent(value)}`;
}

function arrayToQueryString(key, values, queryString, options = {}) {
  return values.map(value => keyValueToQueryString(key, value, queryString, true, options)).join('&');
}

function objectToQueryString(params, queryString = '', options = {}) {
  let paramsStringArray = [];

  if (Array.isArray(params)) {
    paramsStringArray = params.map((value, index) => {
      return keyValueToQueryString(`${index}`, value, queryString, true, options);
    });
  } else {
    paramsStringArray = Object.keys(params)
      .filter(key => params[key] !== undefined)// Can be 0
      .map(key =>
        (params[key] && Array.isArray(params[key]))
          ? arrayToQueryString(`${key}`, params[key], queryString, options)
          : keyValueToQueryString(key, params[key], queryString, false, options));
  }
  return paramsStringArray.join('&').replace(/%20/g, '+');
};

export default objectToQueryString;
