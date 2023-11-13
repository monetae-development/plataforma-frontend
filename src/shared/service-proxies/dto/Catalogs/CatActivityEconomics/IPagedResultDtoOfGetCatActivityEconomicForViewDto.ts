import { GetCatActivityEconomicForViewDto } from './GetCatActivityEconomicForViewDto';

export interface IPagedResultDtoOfGetCatActivityEconomicForViewDto {
    totalCount: number;
    items: GetCatActivityEconomicForViewDto[] | undefined;
}
