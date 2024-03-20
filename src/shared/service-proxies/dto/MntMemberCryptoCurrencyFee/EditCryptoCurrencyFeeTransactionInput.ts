import { IEditCryptoCurrencyFeeTransactionInput } from './IEditCryptoCurrencyFeeTransactionInput';

export class EditCryptoCurrencyFeeTransactionInput {
    mntMemberLevelId: number;
    tradingCryptoCurrencyId: number;
    transactionSendMin: string;
    transactionSendMax: string;
    transactionSendFee: string;

    constructor(data?: IEditCryptoCurrencyFeeTransactionInput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): EditCryptoCurrencyFeeTransactionInput {
        data = typeof data === 'object' ? data : {};
        let result = new EditCryptoCurrencyFeeTransactionInput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberLevelId = _data['mntMemberLevelId'];
            this.tradingCryptoCurrencyId = _data['tradingCryptoCurrencyId'];
            this.transactionSendMin = _data['transactionSendMin'];
            this.transactionSendMax = _data['transactionSendMax'];
            this.transactionSendFee = _data['transactionSendFee'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberLevelId'] = this.mntMemberLevelId;
        data['tradingCryptoCurrencyId'] = this.tradingCryptoCurrencyId;
        data['transactionSendMin'] = this.transactionSendMin;
        data['transactionSendMax'] = this.transactionSendMax;
        data['transactionSendFee'] = this.transactionSendFee;
        return data;
    }
}
