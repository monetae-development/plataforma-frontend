import { GetCatIdentityTypeForViewDto } from './GetCatIdentityTypeForViewDto';

export interface IPagedResultDtoOfGetCatIdentityTypeForViewDto {
    totalCount: number;
    items: GetCatIdentityTypeForViewDto[] | undefined;
}
