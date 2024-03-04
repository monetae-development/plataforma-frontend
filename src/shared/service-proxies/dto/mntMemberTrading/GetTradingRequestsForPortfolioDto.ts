import { IGetTradingRequestsForPortfolioDto } from './IGetTradingRequestsForPortfolioDto';

export class GetTradingRequestsForPortfolioDto implements IGetTradingRequestsForPortfolioDto {
    tradingCryptoCurrencyId: number;
    name: string;
    key: string;
    changePct24Hour: number;
    totalPercent: number;
    profitPercent: number;
    amount: number;

    constructor(data?: IGetTradingRequestsForPortfolioDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetTradingRequestsForPortfolioDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetTradingRequestsForPortfolioDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.tradingCryptoCurrencyId = _data['tradingCryptoCurrencyId'];
            this.name = _data['name'];
            this.key = _data['key'];
            this.changePct24Hour = _data['changePct24Hour'];
            this.totalPercent = _data['totalPercent'];
            this.profitPercent = _data['profitPercent'];
            this.amount = _data['amount'];
        }
    }

    toJSON(data?: any) {
        data['tradingCryptoCurrencyId'] = this.tradingCryptoCurrencyId;
        data['name'] = this.name;
        data['key'] = this.key;
        data['changePct24Hour'] = this.changePct24Hour;
        data['totalPercent'] = this.totalPercent;
        data['profitPercent'] = this.profitPercent;
        data['amount'] = this.amount;
        return data;
    }
}
