import { PRGetTradingPortfolioRequestForViewDto } from "./PRGetTradingPortfolioRequestForViewDto";

export interface IPRGetAllMntMemberTradingPortfolioForViewDto {
    totalCount: number;
    items: PRGetTradingPortfolioRequestForViewDto[] | undefined;
}