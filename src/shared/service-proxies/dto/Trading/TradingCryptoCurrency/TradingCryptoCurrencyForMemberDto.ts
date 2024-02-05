import { ITradingCryptoCurrencyForMemberDto } from './ITradingCryptoCurrencyForMemberDto';

export class TradingCryptoCurrencyForMemberDto implements ITradingCryptoCurrencyForMemberDto {
    name!: string;
    key!: string;
    id!: number;

    constructor(data?: ITradingCryptoCurrencyForMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): TradingCryptoCurrencyForMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new TradingCryptoCurrencyForMemberDto();
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
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['key'] = this.key;
        data['id'] = this.id;
        return data;
    }
}
