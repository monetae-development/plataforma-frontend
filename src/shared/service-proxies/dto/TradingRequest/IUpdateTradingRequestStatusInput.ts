import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';

export interface IUpdateTradingRequestStatusInput {
    id: number;
    userId: number;
    status: RequestStatus;
}
