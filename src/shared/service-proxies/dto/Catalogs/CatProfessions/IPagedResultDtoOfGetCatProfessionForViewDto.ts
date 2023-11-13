import { GetCatProfessionForViewDto } from './GetCatProfessionForViewDto';

export interface IPagedResultDtoOfGetCatProfessionForViewDto {
    totalCount: number;
    items: GetCatProfessionForViewDto[] | undefined;
}
