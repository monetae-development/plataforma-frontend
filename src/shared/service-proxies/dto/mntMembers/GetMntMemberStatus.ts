import { IGetMntMemberStatus } from './IGetMntMemberStatus';


export class GetMntMemberStatus implements IGetMntMemberStatus{
    completed: boolean;
    approved: boolean;
    refused: boolean;
    status: number;

    constructor(data?: GetMntMemberStatus) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberStatus {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberStatus();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.completed = _data['completed'];
            this.approved = _data['approved'];
            this.refused = _data['refused'];
            this.status = _data['status'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['completed'] = this.completed;
        data['approved'] = this.approved;
        data['refused'] = this.refused;
        data['status'] = this.status;
        return data;
    }
}
