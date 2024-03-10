export function parseUrlParams (searchParams) {
    const params = {};
    
    for(let entry of searchParams.entries()) {
        if (entry[0].includes('filter')) {
            const filterValue = entry[1] === "null" ? null : entry[1];
            params[entry[0]] = filterValue;
        } else {
            params[entry[0]] = Number.parseInt(entry[1]);
        }
    }

    return params;
}