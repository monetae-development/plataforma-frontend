import { GetSelectDto } from '../Common/SelectInput/GetSelectDto';

export interface IGetAllCryptoCurrenciesForSelectDto {
    label: string;
    subtitle: string;
    value: number;
    tradingCryptoCurrencyId: number;
    blockchainNetworks: GetSelectDto[];
    assetId: number;
}
