import { CurrencyDto } from './CurrencyDto';
import { MntMemberFiatRequestDto } from './MntMemberFiatRequestDto';

export interface IGetMemberDetailRequestDto {
    request: MntMemberFiatRequestDto;
    currency: CurrencyDto;
}
