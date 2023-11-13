import { GetAllMntMemberFiatForViewDto } from './GetAllMntMemberFiatForViewDto';

export interface IPRGetAllMntMemberFiatForViewDto {
    totalCount: number;
    items: GetAllMntMemberFiatForViewDto[] | undefined;
}
