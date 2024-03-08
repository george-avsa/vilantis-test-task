import axios from "axios";
import getTimestamp from "../helpers/getTimestamp.js";
import md5 from "js-md5";

export default async function getData(body) {

    const url = 'https://api.valantis.store:41000/';
    
    try {
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                "X-Auth": md5(`Valantis_${getTimestamp()}`)
            }
        });
        
        return response.data;

    } catch (e) {
        console.error(e.toString());
        return await getData(body);
    }

} 