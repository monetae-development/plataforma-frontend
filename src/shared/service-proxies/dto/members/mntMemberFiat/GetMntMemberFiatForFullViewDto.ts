import { IGetMntMemberFiatForFullViewDto } from './IGetMntMemberFiatForFullViewDto';
import { MntMemberFiatFullDto } from './MntMemberFiatFullDto';

export class GetMntMemberFiatForFullViewDto implements IGetMntMemberFiatForFullViewDto {
    mntMemberFiat!: MntMemberFiatFullDto;

    constructor(data?: IGetMntMemberFiatForFullViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberFiatForFullViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberFiatForFullViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberFiat = _data['mntMemberFiatFull'] ? MntMemberFiatFullDto.fromJS(_data['mntMemberFiatFull']) : <any>undefined;

        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberFiatFull '] = this.mntMemberFiat ? this.mntMemberFiat.toJSON() : <any>undefined;
        return data;
    }
}
