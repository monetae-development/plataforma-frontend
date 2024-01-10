export interface IGetTransactionForRequestDto {
    id: number;
    amount: number;
    originVaultId: number;
    destinationAddress: string;
    status: string;
    subStatus: string;
    fireblocksId: string;
    errorLog: string;
}
