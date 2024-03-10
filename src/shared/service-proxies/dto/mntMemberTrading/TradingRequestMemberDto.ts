import { RequestStatus } from '@shared/service-proxies/service-proxies';
import { ITradingRequestMemberDto } from './ITradingRequestMemberDto';

export class TradingRequestMemberDto implements ITradingRequestMemberDto {
    folio: string | undefined;
    name: string | undefined;
    key: string | undefined;
    price: number | undefined;
    amount: number | undefined;
    fee: number | undefined;
    feeAmount: number | undefined;
    subTotal: number | undefined;
    total: number | undefined;
    creationTime: string | undefined;
    status: RequestStatus | undefined;

    constructor(data?: ITradingRequestMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): TradingRequestMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new TradingRequestMemberDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.folio = _data['folio'];
            this.name = _data['name'];
            this.key = _data['key'];
            this.price = _data['price'];
            this.amount = _data['amount'];
            this.fee = _data['fee'];
            this.feeAmount = _data['feeAmount'];
            this.subTotal = _data['subTotal'];
            this.total = _data['total'];
            this.creationTime = _data['creationTime'];
            this.status = _data['status'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['folio'] = this.folio;
        data['name'] = this.name;
        data['key'] = this.key;
        data['price'] = this.price;
        data['amount'] = this.amount;
        data['fee'] = this.fee;
        data['feeAmount'] = this.feeAmount;
        data['subTotal'] = this.subTotal;
        data['total'] = this.total;
        data['creationTime'] = this.creationTime;
        data['status'] = this.status;
        return data;
    }
}
