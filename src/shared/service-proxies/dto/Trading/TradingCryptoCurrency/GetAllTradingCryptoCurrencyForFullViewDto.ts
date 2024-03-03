import { IGetAllTradingCryptoCurrencyForFullViewDto } from './IGetAllTradingCryptoCurrencyForFullViewDto';
import { TradingCryptoCurrencyForFullViewDto } from './TradingCryptoCurrencyForFullViewDto';

export class GetAllTradingCryptoCurrencyForFullViewDto implements IGetAllTradingCryptoCurrencyForFullViewDto {
    tradingCryptoCurrency: TradingCryptoCurrencyForFullViewDto;

    constructor(data?: IGetAllTradingCryptoCurrencyForFullViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllTradingCryptoCurrencyForFullViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllTradingCryptoCurrencyForFullViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            let item = _data['tradingCryptoCurrency'] ?? _data['TradingCryptoCurrency'];
            this.tradingCryptoCurrency = item ? TradingCryptoCurrencyForFullViewDto.fromJS(item) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['tradingCryptoCurrency'] = this.tradingCryptoCurrency ? this.tradingCryptoCurrency.toJSON() : <any>undefined;
        return data;
    }
}
