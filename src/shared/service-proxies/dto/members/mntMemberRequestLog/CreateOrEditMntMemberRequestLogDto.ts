import { ICreateOrEditMntMemberRequestLogDto } from './ICreateOrEditMntMemberRequestLogDto';
import { OperationRequestType } from '@shared/service-proxies/enum/Common/OperationRequestType.enum';
import { OperationRequestSubType } from '@shared/service-proxies/enum/Common/OperationRequestSubType.enum';

export class CreateOrEditMntMemberRequestLogDto implements ICreateOrEditMntMemberRequestLogDto {
    id!: number | undefined;
    comment!: string;
    type!: OperationRequestType;
    subtype!: OperationRequestSubType;
    isSendUserEmail!: boolean;

    constructor(data?: ICreateOrEditMntMemberRequestLogDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditMntMemberRequestLogDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditMntMemberRequestLogDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.comment = _data['comment'];
            this.type = _data['type'];
            this.subtype = _data['subtype'];
            this.isSendUserEmail = _data['isSendUserEmail'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['comment'] = this.comment;
        data['type'] = this.type;
        data['subtype'] = this.subtype;
        data['isSendUserEmail'] = this.isSendUserEmail;
        return data;
    }
}
