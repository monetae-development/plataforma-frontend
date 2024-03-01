import { GetAllTradingCryptoCurrencyForFullViewDto } from './GetAllTradingCryptoCurrencyForFullViewDto';

export interface IPRGetAllTradingCryptoCurrencyForFullViewDto {
    totalCount: number;
    items: GetAllTradingCryptoCurrencyForFullViewDto[] | undefined;
}
