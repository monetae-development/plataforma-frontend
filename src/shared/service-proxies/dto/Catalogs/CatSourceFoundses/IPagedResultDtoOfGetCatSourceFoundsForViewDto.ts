import { GetCatSourceFoundsForViewDto } from './GetCatSourceFoundsForViewDto';

export interface IPagedResultDtoOfGetCatSourceFoundsForViewDto {
    totalCount: number;
    items: GetCatSourceFoundsForViewDto[] | undefined;
}
