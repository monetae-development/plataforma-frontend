import { GetMntMemberFiatForFullViewDto } from './GetMntMemberFiatForFullViewDto';

export interface IPRGetAllMntMemberFiatForFullViewDto {
    totalCount: number;
    items: GetMntMemberFiatForFullViewDto[] | undefined;
}
