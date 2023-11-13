import { IUpdateMntMemberFiatRequestStatusInput } from './IUpdateMntMemberFiatRequestStatusInput';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';

export class UpdateMntMemberFiatRequestStatusInput implements IUpdateMntMemberFiatRequestStatusInput {
    id!: number;
    status!: FiatStatus;

    constructor(data?: IUpdateMntMemberFiatRequestStatusInput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): UpdateMntMemberFiatRequestStatusInput {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateMntMemberFiatRequestStatusInput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.status = _data['status'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['status'] = this.status;
        data['id'] = this.id;
        return data;
    }
}
