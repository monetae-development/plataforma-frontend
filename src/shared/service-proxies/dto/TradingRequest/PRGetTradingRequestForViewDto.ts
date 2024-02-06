import { TradingRequestDto } from './TradingRequestDto';
import { IPRGetTradingRequestForViewDto } from './IPRGetTradingRequestForViewDto';
import { GetAllMemberRequestDto } from '../mntMemberTrading/GetAllMemberRequestDto';
import { CryptoCurrencyDto } from '../mntMemberTrading/CryptoCurrencyDto';

export class PRGetTradingRequestForViewDto implements IPRGetTradingRequestForViewDto {
    request!: GetAllMemberRequestDto | undefined;
    cryptoCurrency!: CryptoCurrencyDto | undefined;

    constructor(data?: IPRGetTradingRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PRGetTradingRequestForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new PRGetTradingRequestForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.request = _data['request'] ? GetAllMemberRequestDto.fromJS(_data['request']) : <any>undefined;
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
