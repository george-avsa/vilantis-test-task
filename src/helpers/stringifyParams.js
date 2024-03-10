export function stringifyParams(paramsObject) {

    let stringifiedParams = '';
    for (const [key, value] of Object.entries(paramsObject)) {
        stringifiedParams += `${key}=${value}&`;
    }
    return stringifiedParams;
}