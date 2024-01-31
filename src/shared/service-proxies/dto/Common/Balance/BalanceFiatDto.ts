import { IBalanceFiatDto } from "./IBalanceFiatDto";

export class BalanceFiatDto implements IBalanceFiatDto {
    amount!: number;
    currency!: string;

    constructor(data?: IBalanceFiatDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.amount = _data["amount"];
            this.currency = _data["currency"];
        }
    }

    static fromJS(data: any): BalanceFiatDto {
        data = typeof data === 'object' ? data : {};
        let result = new BalanceFiatDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["amount"] = this.amount;
        data["currency"] = this.currency;
        return data;
    }
}