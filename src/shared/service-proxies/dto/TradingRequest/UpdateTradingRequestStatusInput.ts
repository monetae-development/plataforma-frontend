import { IUpdateTradingRequestStatusInput } from './IUpdateTradingRequestStatusInput';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';

export class UpdateTradingRequestStatusInput implements IUpdateTradingRequestStatusInput {
    id!: number;
    userId!: number;
    status!: RequestStatus;

    constructor(data?: IUpdateTradingRequestStatusInput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): UpdateTradingRequestStatusInput {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateTradingRequestStatusInput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.userId = _data['userId'];
            this.status = _data['status'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['userId'] = this.userId;
        data['status'] = this.status;
        return data;
    }
}

