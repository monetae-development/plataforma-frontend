import { AmountType } from "@shared/service-proxies/enum/MemberTrading/AmountType.enum";
import { ModeType } from "@shared/service-proxies/enum/MemberTrading/ModeType.enum";

export interface IMntMemberTradingRequestDto {
    cryptoCurrencyId: number;
    amount: number;
    amountType: AmountType;
    modeType: ModeType;
}
