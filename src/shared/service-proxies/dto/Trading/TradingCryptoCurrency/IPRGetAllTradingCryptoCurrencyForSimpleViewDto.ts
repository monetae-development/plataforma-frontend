import { GetAllTradingCryptoCurrencyForSimpleViewDto } from './GetAllTradingCryptoCurrencyForSimpleViewDto';

export interface IPRGetAllTradingCryptoCurrencyForSimpleViewDto {
    totalCount: number;
    items: GetAllTradingCryptoCurrencyForSimpleViewDto[] | undefined;
}
