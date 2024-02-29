export interface IGetMntMemberLevelForViewDto {
    id: number;
    title: string | undefined;
    fiatDepositMin: number | undefined;
    fiatDepositMax: number | undefined;
    fiatWithdrawalMin: number | undefined;
    fiatWithdrawalMax: number | undefined;
    default: boolean;
}
