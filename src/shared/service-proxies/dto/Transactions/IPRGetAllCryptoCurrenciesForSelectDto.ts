import { GetAllCryptoCurrenciesForSelectDto } from './GetAllCryptoCurrenciesForSelectDto';

export interface IPRGetAllCryptoCurrenciesForSelectDto {
    totalCount: number;
    items: GetAllCryptoCurrenciesForSelectDto[] | undefined;
}
