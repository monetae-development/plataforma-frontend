import { IOTCRequestPurchaseDto } from './IOTCRequestPurchaseDto';
export class OTCRequestPurchaseDto implements IOTCRequestPurchaseDto{
    id!: number | undefined;
    coinId!: number | undefined;
    amount!: number | undefined;
    cost!: number | undefined;
    countryId!: number | undefined;
}
