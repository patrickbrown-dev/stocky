import { Quote } from "./Quote";
import axios from 'axios';
import { BasicFinancials } from "./BasicFinancials";

export class FinnhubClient {
    apiKey: string;
    baseURI: string = 'https://finnhub.io/api/v1';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getQuote(symbol: string): Promise<Quote> {
        let quote: Quote | undefined;

        try {
            const { data } = await axios.get(`${this.baseURI}/quote?symbol=${symbol}&token=${this.apiKey}`);
            quote = new Quote(data.c, data.d, data.dp, data.h, data.l, data.o, data.pc);
        } catch (error) {
            console.error(error);
        }

        if (quote === undefined) {
            console.error('Quote is undefined');
            throw new Error('Quote is undefined');
        }

        return quote;
    }

    async getBasicFinancials(symbol: string): Promise<BasicFinancials> {
        let basicFinancials: BasicFinancials | undefined;

        try {
            const { data } = await axios.get(`${this.baseURI}/stock/metric?symbol=${symbol}&token=${this.apiKey}&metric=all`);
            basicFinancials = new BasicFinancials(
                data.metric['10DayAverageTradingVolume'],
                data.metric['52WeekHigh'],
                data.metric['52WeekLow'],
                data.metric['52WeekLowDate'],
                data.metric['52WeekPriceReturnDaily'],
                data.metric['beta']
            );
        } catch (error) {
            console.error(error);
        }

        if (basicFinancials === undefined) {
            console.error('Basic Financials is undefined');
            throw new Error('Basic Financials is undefined');
        }

        return basicFinancials;
    }
}