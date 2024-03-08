import getData from "./api/getData.js";
import { pages } from "./api/pages.js"

async function getItems(direction) {
    let ids = [];
    if (direction === 'increment') {
        ids = await pages.getNextPage();
    } else {
        ids = await pages.getPrevPage();
    }

    const data = await getData({
        "action": "get_items",
        "params": {"ids": ids}
    })

    return data;
};

// если есть фильтр
// pages.setFilter({brand: null});
// await pages.getFilteredPages();
// const data3 = await pages.getFilteredPage(3);
// const items = await getItems(data3);
// console.log(items);

// если фильтра нету
// pages.setFilter(null);
// const keklol = await pages.getNextPage();
// console.log(keklol);