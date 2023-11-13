import { IGetAllMntMemberFiatForViewDto } from './IGetAllMntMemberFiatForViewDto';
import { MntMemberFiatDto } from './MntMemberFiatDto';

export class GetAllMntMemberFiatForViewDto implements IGetAllMntMemberFiatForViewDto {
    mntMemberFiatDto!: MntMemberFiatDto;

    constructor(data?: IGetAllMntMemberFiatForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMntMemberFiatForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMntMemberFiatForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberFiatDto = _data['mntMemberFiatDto'] ? MntMemberFiatDto.fromJS(_data['mntMemberFiatDto']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberFiatDto'] = this.mntMemberFiatDto ? this.mntMemberFiatDto.toJSON() : <any>undefined;
        return data;
    }
}
