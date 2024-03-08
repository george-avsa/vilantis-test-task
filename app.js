import getData from './api/getData.js';

const api_uri = 'https://api.valantis.store:41000/';
let tolsta = [];
class Api {
    constructor(offset=0, limit=50, page=0) {
        this.initial = true;

        this.page = page,
        this.idsByPage = {},
        this.offsetNext = 0;
        this.offset = offset;
        this.limit = limit;
        this.idsByPage = {};
        this.idsForPage = [];
    }

    setPage = (increment=true) => {
        // if (this.inital) {
        //     this.initial = false;   
        // } else {

            if (increment) {
                this.page = this.page === 0 ? 1 : ++this.page;
            } else {
                this.page = (this.page - 1) === 0 ? 1 : --this.page;
            }
        // }
    }
    
    getNextPage = async () => {
        this.setPage();
        if (this.idsByPage[this.page]) {
            return this.idsByPage[this.page];
        } else {
            this.offsetNext = 0;
            await this.getIds(1);
            this.idsByPage[this.page] = this.idsForPage;
            this.offset += this.offsetNext;
            this.offsetNext = 0;
            tolsta = [...tolsta, ...this.idsForPage];
            this.idsForPage = [];
            console.log(this.idsByPage);
            return this.idsByPage[this.page];
        }
    }
    
    getPrevPage = async () => {
        this.setPage(false);
        if (this.idsByPage[this.page]) {
            return this.idsByPage[this.page];
        } else {
            this.offsetPrev = 0;
            await this.getIds(0, this.offset - this.limit);
            this.idsByPage[this.page] = this.idsForPage;
            this.offset += this.offsetPrev;
            this.offsetPrev = 0;
            this.idsForPage = [];
            console.log(this.idsByPage);
            return this.idsByPage[this.page];
        }
    }
    
    getIds = async (type, offset=this.offset, limit=this.limit) => {
        console.log(this.page, offset, limit)
        this.offsetNext += limit;
        this.offsetPrev -= limit;
            const data = await getData({
                action: "get_ids",
                params: {
                    offset,
                    limit,
                }
            });
        
            const uniqueIds = Array.from(new Set(this.idsForPage.concat(data.result)));
            this.idsForPage = Array.from(new Set(this.idsForPage.concat(uniqueIds)));

            if (this.idsForPage.length < limit) {
                if (type) {
                    const limitNext = limit - uniqueIds.length;
                    const offsetNext = uniqueIds.length + 1;
                    await this.getIds(1, offsetNext, limitNext);
                } else {
                    const limitNext = limit - this.idsForPage.length;
                    const offsetNext = offset - limitNext;
                    await this.getIds(0, offsetNext, limitNext);
                }
            }
    }
}

const api = new Api();

await api.getNextPage(); // 1
await api.getNextPage(); // 2
await api.getPrevPage(); // 1
await api.getNextPage(); // 2
await api.getNextPage(); // 3
