import { GetSelectSubtitleDto } from './GetSelectSubtitleDto';

export interface IPagedResultOfSelectSubtitleDto {
    totalCount: number;
    items: GetSelectSubtitleDto[] | undefined;
}
