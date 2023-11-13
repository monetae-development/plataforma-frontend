import { GetCatActivityEconomicCategoryForViewDto } from './GetCatActivityEconomicCategoryForViewDto';

export interface IPagedResultDtoOfGetCatActivityEconomicCategoryForViewDto {
    totalCount: number;
    items: GetCatActivityEconomicCategoryForViewDto[] | undefined;
}
