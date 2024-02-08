import { RequestStatus } from "@shared/service-proxies/enum/Trading/RequestStatus.enum"

export interface ITradingRequestMemberDto {
    folio: string,
    name: string,
    key: string,
    price: number,
    amount: number,
    fee: number,
    feeAmount: number,
    subCost: number,
    cost: number,
    creationTime: string
    status: RequestStatus
}