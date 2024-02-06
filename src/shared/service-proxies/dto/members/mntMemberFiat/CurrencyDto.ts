import { ICurrencyDto } from "./ICurrencyDto";

export class CurrencyDto implements ICurrencyDto {
    title!: string;
    symbol!: string;

    constructor(data?: ICurrencyDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data["title"];
            this.symbol = _data["symbol"];
        }
    }

    static fromJS(data: any): CurrencyDto {
        data = typeof data === 'object' ? data : {};
        let result = new CurrencyDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        data["symbol"] = this.symbol;
        return data;
    }
}