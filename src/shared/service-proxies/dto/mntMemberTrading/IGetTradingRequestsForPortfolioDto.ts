export interface IGetTradingRequestsForPortfolioDto {
    tradingCryptoCurrencyId: number;
    name: string;
    key: string;
    changePct24Hour: number;
    totalPercent: number;
    profitPercent: number;
    quantity: number;
    amount: number;
}
