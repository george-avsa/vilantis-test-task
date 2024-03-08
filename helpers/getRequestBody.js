export function getRequestBody(filter, offset=null, limit=null) {
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