export type Options = {
  arrayPrefix?: string
};

export type Param = string | number | boolean | object | Array<Param>;
export type Params = Array<Param> | Record<string, Param>;

// Bundle size optimisation
const euc = encodeURIComponent;

function keyValueToQueryString(key: string, value: Record<string, Param> | Param, queryString: string, isArray: boolean, options: Options): string {
  const arrayPrefix = isArray ? options.arrayPrefix || '' : '';

  if (typeof value === 'object') {
    const tmpQueryString = `${key}${arrayPrefix}${queryString && ']'}[`;

    return `${objectToQueryString(value as Record<string, Param>, `${queryString}${tmpQueryString}`, options)}`;
  }

  if (queryString && queryString.length) {
    return `${queryString}${key}]${arrayPrefix}=${euc(value)}`;
  }

  return `${key}${arrayPrefix}=${euc(value)}`;
}

function arrayToQueryString(key: string, values: Array<Params | Param>, queryString: string, options: Options) : string {
  return values.map(value => keyValueToQueryString(key, value, queryString, true, options)).join('&');
}

function objectToQueryString(params: Params, queryString: string = '', options: Options = {}): string {
  let paramsStringArray = [];

  if (Array.isArray(params)) {
    paramsStringArray = params.map((value, index) => 
      keyValueToQueryString(`${index}`, value, queryString, true, options)
    );
  } else {
    paramsStringArray = Object.keys(params)
      .filter(key => params[key] !== undefined)// Can be 0
      .map(key =>
        (params[key] && Array.isArray(params[key]))
          ? arrayToQueryString(`${key}`, params[key] as Array<Params | Param>, queryString, options)
          : keyValueToQueryString(key, params[key], queryString, false, options));
  }
  return paramsStringArray.join('&').replace(/%20/g, '+');
};

export default objectToQueryString;
