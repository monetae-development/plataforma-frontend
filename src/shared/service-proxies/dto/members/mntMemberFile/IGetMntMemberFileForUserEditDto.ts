import { FileType } from '@shared/service-proxies/enum/Members/FileType.enum';

export interface IGetMntMemberFileForUserEditDto {
    originalName: string | undefined;
    file: string | undefined;
    type: FileType;
}

