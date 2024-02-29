import { IEditTradingRequestStatusDto } from './IEditTradingRequestStatusDto';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { CreateOrEditMntMemberRequestLogDto } from '../members/mntMemberRequestLog/CreateOrEditMntMemberRequestLogDto';

export class EditTradingRequestStatusDto implements IEditTradingRequestStatusDto {
    id!: number;
    userId!: number;
    status: RequestStatus;
    mntMemberRequestLog!: CreateOrEditMntMemberRequestLogDto;


    constructor(data?: IEditTradingRequestStatusDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): EditTradingRequestStatusDto {
        data = typeof data === 'object' ? data : {};
        let result = new EditTradingRequestStatusDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.userId = _data['userId'];
            this.status = _data['status'];
            this.mntMemberRequestLog = _data['mntMemberRequestLog'] ? CreateOrEditMntMemberRequestLogDto.fromJS(_data['mntMemberRequestLog']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['userId'] = this.userId;
        data['status'] = this.status;
        data['mntMemberRequestLog'] = this.mntMemberRequestLog ? this.mntMemberRequestLog.toJSON() : <any>undefined;
        return data;
    }
}

