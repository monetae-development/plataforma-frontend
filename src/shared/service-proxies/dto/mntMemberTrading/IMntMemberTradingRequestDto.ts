import { AmountType } from "@shared/service-proxies/enum/MemberTrading/AmountType.enum";
import { RequestType } from "@shared/service-proxies/enum/MemberTrading/RequestType.enum";

export interface IMntMemberTradingRequestDto {
    cryptoCurrencyId: number;
    amount: number;
    amountType: AmountType;
    type: RequestType;
}
