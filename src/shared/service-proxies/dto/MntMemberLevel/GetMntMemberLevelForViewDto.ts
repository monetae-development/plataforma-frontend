import { IGetMntMemberLevelForViewDto } from './IGetMntMemberLevelForViewDto';

export class GetMntMemberLevelForViewDto implements IGetMntMemberLevelForViewDto {
    id: number;
    title!: string | undefined;
    fiatDepositMin!: number | undefined;
    fiatDepositMax!: number | undefined;
    fiatWithdrawalMin!: number | undefined;
    fiatWithdrawalMax!: number | undefined;
    tradingPurchaseFee!: number | undefined;
    tradingSaleFee!: number | undefined;
    transactionSendFee!: number | undefined;
    transactionSendMin!: number | undefined;
    transactionSendMax!: number | undefined;
    default: boolean;

    constructor(data?: IGetMntMemberLevelForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberLevelForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberLevelForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.title = _data['title'];
            this.fiatDepositMin = _data['fiatDepositMin'];
            this.fiatDepositMax = _data['fiatDepositMax'];
            this.fiatWithdrawalMin = _data['fiatWithdrawalMin'];
            this.fiatWithdrawalMax = _data['fiatWithdrawalMax'];
            this.tradingPurchaseFee = _data['tradingPurchaseFee'];
            this.tradingSaleFee = _data['tradingSaleFee'];
            this.transactionSendFee = _data['transactionSendFee'];
            this.transactionSendMin = _data['transactionSendMin'];
            this.transactionSendMax = _data['transactionSendMax'];
            this.default = _data['default'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['title'] = this.title;
        data['fiatDepositMin'] = this.fiatDepositMin;
        data['fiatDepositMax'] = this.fiatDepositMax;
        data['fiatWithdrawalMin'] = this.fiatWithdrawalMin;
        data['fiatWithdrawalMax'] = this.fiatWithdrawalMax;
        data['tradingPurchaseFee'] = this.tradingPurchaseFee;
        data['tradingSaleFee'] = this.tradingSaleFee;
        data['transactionSendFee'] = this.transactionSendFee;
        data['transactionSendMin'] = this.transactionSendMin;
        data['transactionSendMax'] = this.transactionSendMax;
        data['default'] = this.default;
        return data;
    }
}
