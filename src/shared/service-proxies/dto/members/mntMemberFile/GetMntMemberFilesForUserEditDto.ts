import { IGetMntMemberFilesForUserEditDto } from './IGetMntMemberFilesForUserEditDto';
import { GetMntMemberFileForUserEditDto } from './GetMntMemberFileForUserEditDto';

export class GetMntMemberFilesForUserEditDto implements IGetMntMemberFilesForUserEditDto {
    memberFiles!: GetMntMemberFileForUserEditDto[];

    constructor(data?: IGetMntMemberFilesForUserEditDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberFilesForUserEditDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberFilesForUserEditDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data['memberFiles'])) {
                this.memberFiles = [] as any;
                for (let item of _data['memberFiles']) {
                    this.memberFiles?.push(GetMntMemberFileForUserEditDto.fromJS(item));
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.memberFiles)) {
            data['emberFiles'] = [];
            for (let item of this.memberFiles) {
                data['memberFiles'].push(item.toJSON());
            }
        }
        return data;
    }
}
