import { RequestStatus } from "@shared/service-proxies/enum/Trading/RequestStatus.enum";

export interface IGetAllMemberTransactionRequestDto {
    blockchainNetworkTitle: string;
    amount: number;
    creationTime: string;
    requestStatus: RequestStatus;
}
