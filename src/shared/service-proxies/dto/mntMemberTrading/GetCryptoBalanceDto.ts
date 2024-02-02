import { IGetCryptoBalanceDto } from "./IGetCryptoBalanceDto";

export class GetCryptoBalanceDto implements IGetCryptoBalanceDto {
    amount: number;

    constructor(data?: IGetCryptoBalanceDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCryptoBalanceDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCryptoBalanceDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.amount = _data['amount'];
        }
    }

    toJSON(data?: any) {
        data['amount'] = this.amount;
        return data;
    }
}
