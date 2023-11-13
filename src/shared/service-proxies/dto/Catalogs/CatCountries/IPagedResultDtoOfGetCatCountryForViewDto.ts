import { GetCatCountryForViewDto } from './GetCatCountryForViewDto';

export interface IPagedResultDtoOfGetCatCountryForViewDto {
    totalCount: number;
    items: GetCatCountryForViewDto[] | undefined;
}
