import { getRequestBody } from '../helpers/getRequestBody.js';
import getData from './getData.js';

export class Pages {
    initial: boolean;
    filter: null;
    page: number;
    idsByPage: {};
    offsetPrev: number;
    offsetNext: number;
    offset: number;
    limit: number;
    idsForPage: any[];

    constructor(offset=0, limit=50, page=0) {
        this.initial = true;

        this.filter = null;

        this.page = page,
        this.idsByPage = {},
        this.offsetNext = 0;
        this.offset = offset;
        this.limit = limit;
        this.idsByPage = {};
        this.idsForPage = [];
    }
    
    setFilter = (filter) => {
        this.filter = filter;
        this.idsByPage = {};
        this.idsForPage = [];
        this.page = 0;
    }

    getFilteredPages = async () => {
        const data = await getData(getRequestBody(this.filter));
        const uniqueIds = Array.from(new Set(data.result));
        let offset = 0;
        for (let i = 1; i <= Math.ceil(uniqueIds.length / this.limit); ++i) {
            this.idsByPage[i] = uniqueIds.slice(offset, offset + this.limit);
            offset += this.limit;
        }
    }

    setPage = (increment=true) => {
        if (increment) {
            this.page = this.page === 0 ? 1 : ++this.page;
        } else {
            this.page = (this.page - 1) === 0 ? 1 : --this.page;
        }
    }

    getFilteredPage = (page) => {
        if (page && this.idsByPage[page]) {
            return this.idsByPage[page];
        } else {
            return [];
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
                this.idsByPage[this.page] = this.idsForPage;
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
            this.idsByPage[this.page] = this.idsForPage;
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