import {GetCatNationalityForViewDto} from './GetCatNationalityForViewDto';

export interface IPagedResultDtoOfGetCatNationalityForViewDto {
    totalCount: number;
    items: GetCatNationalityForViewDto[] | undefined;
}
