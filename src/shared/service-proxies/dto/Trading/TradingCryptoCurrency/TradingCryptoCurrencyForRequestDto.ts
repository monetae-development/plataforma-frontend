import { ITradingCryptoCurrencyForRequestDto } from './ITradingCryptoCurrencyForRequestDto';

export class TradingCryptoCurrencyForRequestDto implements ITradingCryptoCurrencyForRequestDto {
    name!: string;
    key!: string;
    id!: number;

    constructor(data?: ITradingCryptoCurrencyForRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): TradingCryptoCurrencyForRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new TradingCryptoCurrencyForRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data['name'];
            this.key = _data['key'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data['name'] = this.name;
        data['key'] = this.key;
        data['id'] = this.id;
        return data;
    }
}
