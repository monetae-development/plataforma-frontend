import { CurrencyDto } from './CurrencyDto';
import { MntMemberFiatDto } from './MntMemberFiatDto';

export interface IGetAllMntMemberFiatForViewDto {
    request: MntMemberFiatDto;
    currency: CurrencyDto;
}
