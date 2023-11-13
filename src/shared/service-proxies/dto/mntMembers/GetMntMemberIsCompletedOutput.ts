import { IGetMntMemberIsCompletedOutput } from './IGetMntMemberIsCompletedOutput';


export class GetMntMemberIsCompletedOutput implements IGetMntMemberIsCompletedOutput{
    isCompleted: boolean;

    constructor(data?: GetMntMemberIsCompletedOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberIsCompletedOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberIsCompletedOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.isCompleted = _data['isCompleted'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['isCompleted'] = this.isCompleted;
        return data;
    }
}
