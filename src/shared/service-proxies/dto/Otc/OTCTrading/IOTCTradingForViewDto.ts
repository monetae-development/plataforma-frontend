import { CryptoBehaviors } from '@shared/service-proxies/enum/OTC/CryptoBehaviors.enum';

export interface IOTCTradingForViewDto {
    id: number | undefined;
    name: string | undefined;
    key: string | undefined;
    salePrice: number | undefined;
    purchasePrice: number | undefined;
    change24h: number | undefined;
    behavior: CryptoBehaviors;
}
