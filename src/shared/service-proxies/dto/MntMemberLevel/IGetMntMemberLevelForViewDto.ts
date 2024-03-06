export interface IGetMntMemberLevelForViewDto {
    id: number;
    title: string | undefined;
    fiatDepositMin: number | undefined;
    fiatDepositMax: number | undefined;
    fiatWithdrawalMin: number | undefined;
    fiatWithdrawalMax: number | undefined;
    tradingPurchaseFee: number | undefined;
    tradingSaleFee: number | undefined;
    default: boolean;
}
