import { GetCatStateForViewDto } from './GetCatStateForViewDto';

export interface IPagedResultDtoOfGetCatStateForViewDto {
    totalCount: number;
    items: GetCatStateForViewDto[] | undefined;
}
