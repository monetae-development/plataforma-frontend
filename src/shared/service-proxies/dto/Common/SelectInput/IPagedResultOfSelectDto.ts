import { GetSelectDto } from './GetSelectDto';

export interface IPagedResultOfSelectDto {
    totalCount: number;
    items: GetSelectDto[] | undefined;
}
