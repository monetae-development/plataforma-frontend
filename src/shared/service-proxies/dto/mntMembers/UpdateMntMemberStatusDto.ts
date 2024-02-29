import { IUpdateMntMemberStatusDto } from './IUpdateMntMemberStatusDto';
import { MemberStatus } from '@shared/service-proxies/enum/Members/MemberStatus.enum';
import { CreateOrEditMntMemberRequestLogDto } from '../members/mntMemberRequestLog/CreateOrEditMntMemberRequestLogDto';

export class UpdateMntMemberStatusDto implements IUpdateMntMemberStatusDto {
    id!: number | undefined;
    status: MemberStatus;
    mntMemberRequestLog!: CreateOrEditMntMemberRequestLogDto;

    constructor(data?: IUpdateMntMemberStatusDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): UpdateMntMemberStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new UpdateMntMemberStatusDto();
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
