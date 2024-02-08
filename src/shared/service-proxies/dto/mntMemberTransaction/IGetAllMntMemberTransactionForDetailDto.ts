import { TradingCryptoCurrencyForMemberDto } from './TradingCryptoCurrencyForMemberDto';
import { TransactionRequestForMemberDetailDto } from './TransactionRequestForMemberDetailDto';

export interface IGetAllMntMemberTransactionForDetailDto {
    request: TransactionRequestForMemberDetailDto | undefined;
    cryptoCurrency: TradingCryptoCurrencyForMemberDto | undefined;
}
