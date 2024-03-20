import { IGetCryptoCurrencyFeeTransactionForSelectDto } from './IGetMntMemberCryptoCurrencyFeeTransactionForSelectDto';

export class GetCryptoCurrencyFeeTransactionForSelectDto {
    label: string;
    value!: number;
    subtitle!: string;
    transactionSendMin!: string;
    transactionSendMax!: string;
    transactionSendFee!: string;

    constructor(data?: IGetCryptoCurrencyFeeTransactionForSelectDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCryptoCurrencyFeeTransactionForSelectDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCryptoCurrencyFeeTransactionForSelectDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.value = _data['value'];
            this.subtitle = _data['subtitle'];
            this.transactionSendMin = _data['transactionSendMin'];
            this.transactionSendMax = _data['transactionSendMax'];
            this.transactionSendFee = _data['transactionSendFee'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['label'] = this.label;
        data['value'] = this.value;
        data['subtitle'] = this.subtitle;
        data['transactionSendMin'] = this.transactionSendMin;
        data['transactionSendMax'] = this.transactionSendMax;
        data['transactionSendFee'] = this.transactionSendFee;
        return data;
    }
}
