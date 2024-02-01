import { AmountType } from '@shared/service-proxies/enum/MemberTrading/AmountType.enum';
import { IMntMemberTradingRequestDto } from './IMntMemberTradingRequestDto';
import { ModeType } from '@shared/service-proxies/enum/MemberTrading/ModeType.enum';

export class MntMemberTradingRequestDto implements IMntMemberTradingRequestDto {
    cryptoCurrencyId: number;
    amount: number;
    amountType: AmountType;
    modeType: ModeType;

    constructor(data?: IMntMemberTradingRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberTradingRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberTradingRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.cryptoCurrencyId = _data['cryptoCurrencyId'];
            this.amount = _data['amount'];
            this.amountType = _data['amountType'];
            this.modeType = _data['modeType'];
        }
    }

    toJSON(data?: any) {
        data['cryptoCurrencyId'] = this.cryptoCurrencyId;
        data['amount'] = this.amount;
        data['amountType'] = this.amountType;
        data['modeType'] = this.modeType;
        return data;
    }
}
