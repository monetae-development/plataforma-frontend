import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';

export interface ITradingRequestMemberDto {
    folio: string | undefined;
    name: string | undefined;
    key: string | undefined;
    price: number | undefined;
    amount: number | undefined;
    fee: number | undefined;
    feeAmount: number | undefined;
    subTotal: number | undefined;
    total: number | undefined;
    creationTime: string | undefined;
    status: RequestStatus;
}
