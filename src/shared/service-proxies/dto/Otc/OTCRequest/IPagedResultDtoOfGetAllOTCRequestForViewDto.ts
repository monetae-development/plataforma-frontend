import { GetOTCRequestForViewDto } from './GetOTCRequestForViewDto';

export interface IPagedResultDtoOfGetAllOTCRequestForViewDto {
    totalCount: number;
    items: GetOTCRequestForViewDto[] | undefined;
}
