import { IGetAllMntMemberLevelForViewDto } from './IGetAllMntMemberLevelForViewDto';
import { GetMntMemberLevelForViewDto } from './GetMntMemberLevelForViewDto';

export class GetAllMntMemberLevelForViewDto implements IGetAllMntMemberLevelForViewDto {
    level1!: GetMntMemberLevelForViewDto;
    level2!: GetMntMemberLevelForViewDto;
    level3!: GetMntMemberLevelForViewDto;

    constructor(data?: IGetAllMntMemberLevelForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMntMemberLevelForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMntMemberLevelForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.level1 = _data['level1'] ? GetMntMemberLevelForViewDto.fromJS(_data['level1']) : <any>undefined;
            this.level2 = _data['level2'] ? GetMntMemberLevelForViewDto.fromJS(_data['level2']) : <any>undefined;
            this.level3 = _data['level3'] ? GetMntMemberLevelForViewDto.fromJS(_data['level3']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['level1'] = this.level1 ? this.level1.toJSON() : <any>undefined;
        data['level2'] = this.level1 ? this.level2.toJSON() : <any>undefined;
        data['level3'] = this.level1 ? this.level3.toJSON() : <any>undefined;
        return data;
    }
}
