import { IGetMntMemberFileForUserEditDto } from './IGetMntMemberFileForUserEditDto';
import { FileType } from '@shared/service-proxies/enum/Members/FileType.enum';

export class GetMntMemberFileForUserEditDto implements IGetMntMemberFileForUserEditDto {
    originalName: string;
    file: string;
    type: FileType;

    constructor(data?: IGetMntMemberFileForUserEditDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberFileForUserEditDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberFileForUserEditDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.originalName = _data['originalName'];
            this.file = _data['file'];
            this.type = _data['type'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['originalName'] = this.originalName;
        data['file'] = this.file;
        data['type'] = this.type;
        return data;
    }
}
