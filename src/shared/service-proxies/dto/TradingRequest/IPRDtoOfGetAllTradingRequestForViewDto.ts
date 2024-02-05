import { GetTradingRequestForViewDto } from './GetTradingForViewDto';

export interface IPRDtoOfGetAllTradingRequestForViewDto {
    totalCount: number;
    items: GetTradingRequestForViewDto[] | undefined;
}
