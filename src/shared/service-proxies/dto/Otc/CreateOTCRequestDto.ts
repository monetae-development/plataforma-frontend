import { ICreateOTCRequestDto} from './ICreateOTCRequestDto';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';

export class CreateOTCRequestDto implements ICreateOTCRequestDto{
    type!: RequestType;
    price!: number;
    amount!: number;
    cost!: number;
    otcCoinId!: number;
    mntMemberBankAccountId!: number | undefined;
}
