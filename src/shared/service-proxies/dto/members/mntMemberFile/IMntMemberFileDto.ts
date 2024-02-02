import { FileType } from '@shared/service-proxies/enum/Members/FileType.enum';

export interface IMntMemberFileDto {
    id: number;
    file: string;
    type: FileType;
    lock: boolean;
    s3TransferCompleted: boolean;
    mntMemberId: number;
}
