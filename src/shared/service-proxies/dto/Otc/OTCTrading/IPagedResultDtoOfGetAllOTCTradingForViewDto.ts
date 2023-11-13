import { GetOTCTradingForViewDto } from './GetOTCTradingForViewDto';

export interface IPagedResultDtoOfGetAllOTCTradingForViewDto {
    totalCount: number;
    items: GetOTCTradingForViewDto[] | undefined;
}
