import { RequestStatus } from "@shared/service-proxies/enum/Trading/RequestStatus.enum";
import { IGetAllMemberTransactionRequestDto } from "./IGetAllMemberTransactionRequestDto";
import { ITransactionRequestForMemberDetailDto } from "./ITransactionRequestForMemberDetailDto";
import { DateTime } from "luxon";

export class TransactionRequestForMemberDetailDto implements ITransactionRequestForMemberDetailDto {
    originAddress: string;
    destinationAddress: string;
    blockchainNetworkTitle: string;
    amount: number;
    creationTime: DateTime;
    requestStatus: number;

    constructor(data?: ITransactionRequestForMemberDetailDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): TransactionRequestForMemberDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new TransactionRequestForMemberDetailDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.originAddress = _data['originAddress'];
            this.destinationAddress = _data['destinationAddress'];
            this.blockchainNetworkTitle = _data['blockchainNetworkTitle'];
            this.amount = _data['amount'];
            this.creationTime = _data['creationTime'];
            this.requestStatus = _data['requestStatus'];
        }
    }

    toJSON(data?: any) {
        data['originAddress'] = this.originAddress;
        data['destinationAddress'] = this.destinationAddress;
        data['blockchainNetworkTitle'] = this.blockchainNetworkTitle;
        data['amount'] = this.amount;
        data['creationTime'] = this.creationTime;
        data['requestStatus'] = this.requestStatus;
        return data;
    }
}
