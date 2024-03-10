export function parseUrlParams (searchParams) {
    const params = {};

    for(let entry of searchParams.entries()) {
        params[entry[0]] = entry[1];
    }

    return params;
}