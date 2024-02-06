import { CryptoCurrencyDto } from '../mntMemberTrading/CryptoCurrencyDto';
import { GetAllMemberTransactionRequestDto } from './GetAllMemberTransactionRequestDto';

export interface IPRGetTransactionRequestForViewDto {
    request: GetAllMemberTransactionRequestDto | undefined;
    cryptoCurrency: CryptoCurrencyDto | undefined;
}
