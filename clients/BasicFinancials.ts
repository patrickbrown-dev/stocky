export class BasicFinancials {
    tenDayAverageTradingVolume: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekLowDate: Date;
    fiftyTwoWeekPriceReturnDaily: number;
    beta: number;

    constructor (tenDayAverageTradingVolume: number, fiftyTwoWeekHigh: number, fiftyTwoWeekLow: number, fiftyTwoWeekLowDate: number, fiftyTwoWeekPriceReturnDaily: number, beta: number) {
        this.tenDayAverageTradingVolume = tenDayAverageTradingVolume;
        this.fiftyTwoWeekHigh = fiftyTwoWeekHigh;
        this.fiftyTwoWeekLow = fiftyTwoWeekLow;
        this.fiftyTwoWeekLowDate = new Date(fiftyTwoWeekLowDate);
        this.fiftyTwoWeekPriceReturnDaily = fiftyTwoWeekPriceReturnDaily;
        this.beta = beta;
    }
}