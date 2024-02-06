import { CryptoCurrencyDto } from '../mntMemberTrading/CryptoCurrencyDto';
import { GetAllMemberRequestDto } from '../mntMemberTrading/GetAllMemberRequestDto';

export interface IPRGetTradingRequestForViewDto {
    request: GetAllMemberRequestDto | undefined;
    cryptoCurrency: CryptoCurrencyDto | undefined;
}
