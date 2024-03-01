import { CryptoBehaviors } from "@shared/service-proxies/enum/Trading/CryptoBehaviors.enum";

export interface ITradingCryptoCurrencyForSimpleViewDto {
    id: number;
    name: string;
    key: string;
    salePrice: number;
    purchasePrice: number;
    change24h: number;
    behavior: CryptoBehaviors;
}
