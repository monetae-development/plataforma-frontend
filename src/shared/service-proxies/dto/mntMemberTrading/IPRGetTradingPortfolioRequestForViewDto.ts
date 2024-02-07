import { CryptoCurrencyDto } from '../mntMemberTrading/CryptoCurrencyDto';
import { GetAllMemberPortfolioRequestDto } from './GetAllMemberPortfolioRequestDto';

export interface IPRGetTradingPortfolioRequestForViewDto {
    request: GetAllMemberPortfolioRequestDto | undefined;
    cryptoCurrency: CryptoCurrencyDto | undefined;
}
