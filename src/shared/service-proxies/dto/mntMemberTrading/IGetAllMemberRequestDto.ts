import { RequestType } from '@shared/service-proxies/enum/MemberTrading/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';

export interface IGetAllMemberRequestDto {
    folio: string;
    type: RequestType;
    amount: number;
    total: number;
    creationTime: string;
    status: RequestStatus;
    id: number;
}
