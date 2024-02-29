import { IUpdateMntMemberFiatRequestStatusDto } from './IUpdateMntMemberFiatRequestStatusDto';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { CreateOrEditMntMemberRequestLogDto } from '../mntMemberRequestLog/CreateOrEditMntMemberRequestLogDto';


export class UpdateMntMemberFiatRequestStatusDto implements IUpdateMntMemberFiatRequestStatusDto {
    id!: number | undefined;
    status!: FiatStatus;
    mntMemberRequestLog!: CreateOrEditMntMemberRequestLogDto;

    constructor(data?: IUpdateMntMemberFiatRequestStatusDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): UpdateMntMemberFiatRequestStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateMntMemberFiatRequestStatusDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.status = _data['status'];
            this.mntMemberRequestLog = _data['mntMemberRequestLog'] ? CreateOrEditMntMemberRequestLogDto.fromJS(_data['mntMemberRequestLog']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['status'] = this.status;
        data['mntMemberRequestLog'] = this.mntMemberRequestLog ? this.mntMemberRequestLog.toJSON() : <any>undefined;
        return data;
    }
}
