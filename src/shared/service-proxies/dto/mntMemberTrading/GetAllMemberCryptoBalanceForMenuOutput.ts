import { IGetAllMemberCryptoBalanceForMenuOutput } from './IGetAllMemberCryptoBalanceForMenuOutput';

export class GetAllMemberCryptoBalanceForMenuOutput implements IGetAllMemberCryptoBalanceForMenuOutput {
    label: string;
    name: string;
    amount: number;
    tradingCryptoCurrencyId: number;

    constructor(data?: IGetAllMemberCryptoBalanceForMenuOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMemberCryptoBalanceForMenuOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMemberCryptoBalanceForMenuOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.name = _data['name'];
            this.amount = _data['amount'];
            this.tradingCryptoCurrencyId = _data['tradingCryptoCurrencyId'];
        }
    }

    toJSON(data?: any) {
        data['label'] = this.label;
        data['name'] = this.name;
        data['amount'] = this.amount;
        data['tradingCryptoCurrencyId'] = this.tradingCryptoCurrencyId;
        return data;
    }

}
