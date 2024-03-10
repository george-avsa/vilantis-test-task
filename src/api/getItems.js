// import { pages } from "../index.tsx";
import getData from "./getData.js";
import { Pages } from "./pages.js";


export async function getItems(ids) {
    const data = await getData({
        "action": "get_items",
        "params": {"ids": ids}
    })

    return data;
};