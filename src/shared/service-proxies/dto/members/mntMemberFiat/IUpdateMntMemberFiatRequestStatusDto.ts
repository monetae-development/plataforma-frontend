import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { CreateOrEditMntMemberRequestLogDto } from '../mntMemberRequestLog/CreateOrEditMntMemberRequestLogDto';

export interface IUpdateMntMemberFiatRequestStatusDto {
    id: number | undefined;
    status: FiatStatus;
    mntMemberRequestLog: CreateOrEditMntMemberRequestLogDto | undefined;
}
