export function getRequestBody(filter, offset=0, limit=0) {
    if (filter) {
        return {
            action: "filter",
            params: {...filter}
        }
    } else {
        return {
            action: "get_ids",
            params: {
                offset,
                limit,
            }
        }
    }
}