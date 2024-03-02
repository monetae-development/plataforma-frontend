import { IGetAllTradingCryptoCurrencyForSimpleViewDto } from './IGetAllTradingCryptoCurrencyForSimpleViewDto';
import { TradingCryptoCurrencyForSimpleViewDto } from './TradingCryptoCurrencyForSimpleViewDto';

export class GetAllTradingCryptoCurrencyForSimpleViewDto implements IGetAllTradingCryptoCurrencyForSimpleViewDto {
    tradingCryptoCurrency: TradingCryptoCurrencyForSimpleViewDto;

    constructor(data?: IGetAllTradingCryptoCurrencyForSimpleViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllTradingCryptoCurrencyForSimpleViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllTradingCryptoCurrencyForSimpleViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            let item = _data['tradingCryptoCurrency'] ?? _data['TradingCryptoCurrency'];
            this.tradingCryptoCurrency = item ? TradingCryptoCurrencyForSimpleViewDto.fromJS(item) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['tradingCryptoCurrency'] = this.tradingCryptoCurrency ? this.tradingCryptoCurrency.toJSON() : <any>undefined;
        return data;
    }
}
