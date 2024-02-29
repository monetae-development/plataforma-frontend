export enum OperationRequestSubType {
    //Kyc
    KycApproved = 1,
    KycRefused = 2,
    //Deposit & Withdrawal
    DepositApproved = 10,
    DepositRefused = 11,
    WithdrawalApproved = 12,
    WithdrawalRefused = 13,
    //Trading
    PurchaseComplete = 20,
    PurchaseCancelled = 21,
    SaleComplete = 22,
    SaleCancelled = 23,
    //Transactions
    SendApproved = 30,
    SendFailed = 31,
    SendRefused = 32,
    SendCancelled = 33,
    ReceivedApproved = 34,
    ReceivedFailed = 35,
    ReceivedRefused = 36,
    ReceivedCancelled = 37
}
