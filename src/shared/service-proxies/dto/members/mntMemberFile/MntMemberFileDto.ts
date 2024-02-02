import { IMntMemberFileDto } from './IMntMemberFileDto';
import { FileType } from '@shared/service-proxies/enum/Members/FileType.enum';

export class MntMemberFileDto implements IMntMemberFileDto {
    id!: number | undefined;
    file!: string | undefined;
    type!: FileType | undefined;
    lock: boolean;
    s3TransferCompleted: boolean;
    mntMemberId!: number | undefined;

    constructor(data?: IMntMemberFileDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberFileDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberFileDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.file = _data['file'];
            this.type = _data['type'];
            this.lock = _data['lock'];
            this.s3TransferCompleted = _data['s3TransferCompleted'];
            this.mntMemberId = _data['mntMemberId'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['file'] = this.file;
        data['type'] = this.type;
        data['lock'] = this.lock;
        data['s3TransferCompleted'] = this.s3TransferCompleted;
        data['mntMemberId'] = this.mntMemberId;
        return data;
    }
}
