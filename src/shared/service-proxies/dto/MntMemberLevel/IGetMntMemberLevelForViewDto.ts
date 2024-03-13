export interface IGetMntMemberLevelForViewDto {
    id: number;
    title: string | undefined;
    fiatDepositMin: number | undefined;
    fiatDepositMax: number | undefined;
    fiatWithdrawalMin: number | undefined;
    fiatWithdrawalMax: number | undefined;
    tradingPurchaseFee: number | undefined;
    tradingSaleFee: number | undefined;
    transactionSendFee: number | undefined;
    transactionSendMin: number | undefined;
    transactionSendMax: number | undefined;
    default: boolean;
}
