import { RequestStatus } from "@shared/service-proxies/enum/Trading/RequestStatus.enum";
import { IGetAllMemberTransactionRequestDto } from "./IGetAllMemberTransactionRequestDto";

export class GetAllMemberTransactionRequestDto implements IGetAllMemberTransactionRequestDto {
    blockchainNetworkTitle: string;
    amount: number;
    creationTime: string;
    requestStatus: RequestStatus;

    constructor(data?: IGetAllMemberTransactionRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMemberTransactionRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMemberTransactionRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.blockchainNetworkTitle = _data['blockchainNetworkTitle'];
            this.amount = _data['amount'];
            this.creationTime = _data['creationTime'];
            this.requestStatus = _data['requestStatus'];
        }
    }

    toJSON(data?: any) {
        data['blockchainNetworkTitle'] = this.blockchainNetworkTitle;
        data['amount'] = this.amount;
        data['creationTime'] = this.creationTime;
        data['requestStatus'] = this.requestStatus;
        return data;
    }
}
