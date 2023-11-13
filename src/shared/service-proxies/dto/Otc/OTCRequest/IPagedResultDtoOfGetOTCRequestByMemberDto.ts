import { GetOTCRequestByMemberDto } from './GetOTCRequestByMemberDto';

export class IPagedResultDtoOfGetOTCRequestByMemberDto {
    totalCount: number;
    items: GetOTCRequestByMemberDto[] | undefined;
}
