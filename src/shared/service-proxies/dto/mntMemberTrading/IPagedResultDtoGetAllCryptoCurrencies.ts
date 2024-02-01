import { GetAllCryptoCurrenciesDto } from "./GetAllCryptoCurrenciesDto";

export interface IPagedResultDtoGetAllCryptoCurrencies {
    totalCount: number;
    items: GetAllCryptoCurrenciesDto[] | undefined;
}