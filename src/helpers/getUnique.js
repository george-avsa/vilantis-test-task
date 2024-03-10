export function getUnique(items) {
    const uniqueIds = {};
    const newItems = [];
    items.forEach(item => {
        if (!uniqueIds[item.id]) {
            uniqueIds[item.id] = 1;
            newItems.push(item);
        }
    });

    return newItems;
}