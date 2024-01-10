import { IGetTransactionForRequestDto } from './IGetTransactionForRequestDto';

export class GetTransactionForRequestDto implements IGetTransactionForRequestDto {
    id!: number;
    amount: number;
    originVaultId: number;
    destinationAddress: string;
    status!: string;
    subStatus!: string;
    fireblocksId!: string;
    errorLog!: string;

    constructor(data?: IGetTransactionForRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetTransactionForRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetTransactionForRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.amount = _data['amount'];
            this.originVaultId = _data['originVaultId'];
            this.destinationAddress = _data['destinationAddress'];
            this.status = _data['status'];
            this.subStatus = _data['subStatus'];
            this.fireblocksId = _data['fireblocksId'];
            this.errorLog = _data['errorLog'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['amount'] = this.amount;
        data['originVaultId'] = this.originVaultId;
        data['destinationAddress'] = this.destinationAddress;
        data['status'] = this.status;
        data['subStatus'] = this.subStatus;
        data['fireblocksId'] = this.fireblocksId;
        data['errorLog'] = this.errorLog;
        return data;
    }
}
