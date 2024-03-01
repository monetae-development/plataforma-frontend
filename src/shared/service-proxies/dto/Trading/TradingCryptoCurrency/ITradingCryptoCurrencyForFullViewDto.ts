import { CryptoBehaviors } from "@shared/service-proxies/enum/Trading/CryptoBehaviors.enum";

export interface ITradingCryptoCurrencyForFullViewDto {
    id: number;
    name: string;
    key: string;
    salePrice: number;
    purchasePrice: number;
    salePriceWithFee: number;
    purchasePriceWithFee: number;
    fee: number;
    change24h: number;
    behavior: CryptoBehaviors;
}
