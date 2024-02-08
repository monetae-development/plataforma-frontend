import { ICryptoCurrencyDto } from './ICryptoCurrencyDto';
import { ICurrencyDto } from './ICurrencyDto';

export class CurrencyDto implements ICurrencyDto {
    title: string | undefined;
    symbol: string | undefined;

    constructor(data?: ICryptoCurrencyDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CurrencyDto {
        data = typeof data === 'object' ? data : {};
        let result = new CurrencyDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data['title'];
            this.symbol = _data['symbol'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['title'] = this.title;
        data['symbol'] = this.symbol;
        return data;
    }
}
