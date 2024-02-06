import { RequestType } from "@shared/service-proxies/enum/MemberTrading/RequestType.enum";
import { IGetAllMemberRequestDto } from "./IGetAllMemberRequestDto";
import { RequestStatus } from "@shared/service-proxies/enum/Trading/RequestStatus.enum";

export class GetAllMemberRequestDto implements IGetAllMemberRequestDto {
    folio: string;
    type: RequestType;
    amount: number;
    cost: number;
    creationTime: string;
    status: RequestStatus;
    id: number;

    constructor(data?: IGetAllMemberRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMemberRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMemberRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.folio = _data['folio'];
            this.type = _data['type'];
            this.amount = _data['amount'];
            this.cost = _data['cost'];
            this.creationTime = _data['creationTime'];
            this.status = _data['status'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data['folio'] = this.folio;
        data['type'] = this.type;
        data['amount'] = this.amount;
        data['cost'] = this.cost;
        data['creationTime'] = this.creationTime;
        data['status'] = this.status;
        data['id'] = this.id;
        return data;
    }
}
