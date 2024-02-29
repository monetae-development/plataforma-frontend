import { MemberStatus } from '@shared/service-proxies/enum/Members/MemberStatus.enum';
import { CreateOrEditMntMemberRequestLogDto } from '../members/mntMemberRequestLog/CreateOrEditMntMemberRequestLogDto';

export interface IUpdateMntMemberStatusDto {
    id: number | undefined;
    status: MemberStatus;
    mntMemberRequestLog: CreateOrEditMntMemberRequestLogDto | undefined;
}
