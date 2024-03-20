import { IGetCryptoCurrencyTransactionSendFeeDto } from './IGetCryptoCurrencyTransactionSendFeeDto';

export class GetCryptoCurrencyTransactionSendFeeDto {
    transactionSendFee!: number;

    constructor(data?: IGetCryptoCurrencyTransactionSendFeeDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCryptoCurrencyTransactionSendFeeDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCryptoCurrencyTransactionSendFeeDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.transactionSendFee = _data['transactionSendFee'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['transactionSendFee'] = this.transactionSendFee;
        return data;
    }
}
