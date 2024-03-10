import { getRequestBody } from '../helpers/getRequestBody.js';
import getData from './getData.js';

export class Pages {

    constructor(offset=0, limit=50, page=0) {
        this.initial = true;

        this.filter = null;

        this.page = page,
        this.idsByPage = {},
        this.offsetNext = 0;
        this.offsetPrev = 0;
        this.offset = offset;
        this.limit = limit;
        this.idsByPage = {};
        this.idsForPage = [];
    }

    getPage = async (page=1, filter=null) => {
        
        const direction = page - this.page >= 0 ? 'increment' : 'decrement';
        this.idsForPage = [];
        if (filter) {
            this.filter = filter;
            this.idsByPage = {};
        }

        if (filter !== null && Object.keys(filter)?.length) {
            if (filter.price) {
                filter.price = Number.parseInt(filter.price) || 0;
            }
            const objectByPages = await pages.getFilteredPages(filter);
            return await pages.getFilteredPage(page, objectByPages);
        } else {
            this.filter = null;
            if (direction === 'increment') {
                return this.getNextPage();
            } else {
                return await this.getPrevPage();
            }
        }
    }

    setParams = (page=1, offset=50) => {
        this.page = page;
        this.offset = offset;
    }
    
    setFilter = (filter) => {
        this.filter = filter;
        this.idsByPage = {};
        this.idsForPage = [];
        this.page = 0;
    }

    getFilteredPages = async (filter) => {
        const data = await getData({action: "filter", params: filter});
        const uniqueIds = Array.from(new Set(data.result));
        let offset = 0;
        for (let i = 1; i <= Math.ceil(uniqueIds.length / this.limit); ++i) {
            this.idsByPage[i] = {ids: uniqueIds.slice(offset, offset + this.limit), offset: null};
            offset += this.limit;
        }
        return this.idsByPage;
    }

    setPage = (increment=true) => {
        if (increment) {
            this.page = this.page === 0 ? 1 : ++this.page;
        } else {
            this.page = (this.page - 1) === 0 ? 1 : --this.page;
        }
    }

    getFilteredPage = (page, objectByPages) => {
        if (page && objectByPages[page]) {
            return objectByPages[page];
        } else {
            return objectByPages['1'];
        }
    }
    
    getNextPage = async () => {
        if (this.filter) {
            if (this.idsByPage[this.page]) {
                return this.idsByPage[this.page];
            } else {
                return [];
            }
        } else {
            this.setPage();
            if (this.idsByPage[this.page]) {
                return this.idsByPage[this.page];
            } else {
                this.offsetNext = 0;
                await this.getIds(1);
                this.idsByPage[this.page] = {ids: this.idsForPage, newOffset: this.offset};
                // this.idsByPage[this.page].offset = this.offset;
                this.offset += this.offsetNext;
                this.offsetNext = 0;
                this.idsForPage = [];
                return this.idsByPage[this.page];
            }
        }
    }
    
    getPrevPage = async () => {
        this.setPage(false);
        if (this.idsByPage[this.page]) {
            return this.idsByPage[this.page];
        } else {
            this.offsetPrev = 0;
            await this.getIds(0, this.offset - this.limit);
            this.idsByPage[this.page] = {ids: this.idsForPage, newOffset: this.offset};
            // this.idsByPage[this.page].offset = this.offset;
            this.offset += this.offsetPrev;
            this.offsetPrev = 0;
            this.idsForPage = [];
            return this.idsByPage[this.page];
        }
    }
    
    getIds = async (type, offset=this.offset, limit=this.limit) => {
        
        this.offsetNext += limit;
        this.offsetPrev -= limit;
        const data = await getData(getRequestBody(null, offset, limit));
    
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

export const pages = new Pages();