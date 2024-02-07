import { CryptoCurrencyDto } from '../mntMemberTrading/CryptoCurrencyDto';
import { GetAllMemberPortfolioRequestDto } from './GetAllMemberPortfolioRequestDto';
import { IPRGetTradingPortfolioRequestForViewDto } from './IPRGetTradingPortfolioRequestForViewDto';

export class PRGetTradingPortfolioRequestForViewDto implements IPRGetTradingPortfolioRequestForViewDto {
    request!: GetAllMemberPortfolioRequestDto | undefined;
    cryptoCurrency!: CryptoCurrencyDto | undefined;

    constructor(data?: IPRGetTradingPortfolioRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PRGetTradingPortfolioRequestForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetTradingPortfolioRequestForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.request = _data['request'] ? GetAllMemberPortfolioRequestDto.fromJS(_data['request']) : <any>undefined;
            this.cryptoCurrency = _data['cryptoCurrency'] ? CryptoCurrencyDto.fromJS(_data['cryptoCurrency']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['request'] = this.request ? this.request.toJSON() : <any>undefined;
        data['cryptoCurrency'] = this.cryptoCurrency ? this.cryptoCurrency.toJSON() : <any>undefined;
        return data;
    }
}
