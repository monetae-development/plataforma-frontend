import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { CreateOrEditMntMemberRequestLogDto } from '../members/mntMemberRequestLog/CreateOrEditMntMemberRequestLogDto';

export interface IEditTradingRequestStatusDto {
    id: number | undefined;
    userId: number | undefined;
    status: RequestStatus;
    mntMemberRequestLog: CreateOrEditMntMemberRequestLogDto | undefined;
}
