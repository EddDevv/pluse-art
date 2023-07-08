export interface IStockData {
    buyPrice: number;
    date: string;
    sellPrice: number;
}

export interface IStock {
    buyPrice: number;
    code: string;
    objectName: string;
    sellPrice: number;
    stockExchange: string;
    stockQuoteObject: {
        stockQuoteDaysList: IStockData[];
        stockQuoteMonthsList: IStockData[];
        stockQuoteWeeksList: IStockData[];
    };
}

export enum PeriodEnum {
    // day = "day",
    week = "week",
    month = "month",
    year = "year"
}

export interface ISellStock {
    partnerId: number;
    stockCode: string;
    stockName: string;
    quantity: number;
  }