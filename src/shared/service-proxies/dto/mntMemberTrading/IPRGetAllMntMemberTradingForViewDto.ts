import { PRGetTradingRequestForViewDto } from '../TradingRequest/PRGetTradingRequestForViewDto';

export interface IPRGetAllMntMemberTradingForViewDto {
    totalCount: number;
    items: PRGetTradingRequestForViewDto[] | undefined;
}