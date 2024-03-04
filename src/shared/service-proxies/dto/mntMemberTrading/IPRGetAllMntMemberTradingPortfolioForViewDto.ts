import { GetTradingRequestsForPortfolioDto } from './GetTradingRequestsForPortfolioDto';

export interface IPRGetAllMntMemberTradingPortfolioForViewDto {
    totalCount: number;
    items: GetTradingRequestsForPortfolioDto[] | undefined;
}