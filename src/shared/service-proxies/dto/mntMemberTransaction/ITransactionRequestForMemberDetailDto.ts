import { DateTime } from "luxon";

export interface ITransactionRequestForMemberDetailDto {
    originAddress: string,
    destinationAddress: string,
    blockchainNetworkTitle: string,
    amount: number,
    creationTime: DateTime,
    requestStatus: number
}