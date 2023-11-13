import { GetSelectGroupDto } from './GetSelectGroupDto';

export interface IPagedResultOfSelectGroupDto {
    totalCount: number;
    items: GetSelectGroupDto[] | undefined;
}
