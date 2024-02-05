import { GetTradingRequestByMemberDto } from './GetTradingRequestByMemberDto';

export class IPRDtoOfGetTradingRequestByMemberDto {
    totalCount: number;
    items: GetTradingRequestByMemberDto[] | undefined;
}
