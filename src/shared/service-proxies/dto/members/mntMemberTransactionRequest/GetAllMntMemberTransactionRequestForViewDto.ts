import { IGetAllMntMemberTransactionRequestForViewDto } from './IGetAllMntMemberTransactionRequestForViewDto';
import { GetMntMemberTransactionRequestForViewDto } from './GetMntMemberTransactionRequestForViewDto';

export class GetAllMntMemberTransactionRequestForViewDto implements IGetAllMntMemberTransactionRequestForViewDto {
    mntMemberTransactionRequestDto!: GetMntMemberTransactionRequestForViewDto;

    constructor(data?: IGetAllMntMemberTransactionRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMntMemberTransactionRequestForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMntMemberTransactionRequestForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberTransactionRequestDto = _data['mntMemberTransactionRequestDto'] ? GetMntMemberTransactionRequestForViewDto.fromJS(_data['mntMemberTransactionRequestDto']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberTransactionRequestDto'] = this.mntMemberTransactionRequestDto ? this.mntMemberTransactionRequestDto.toJSON() : <any>undefined;
        return data;
    }
}
