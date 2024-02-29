import {
    CreateOrEditMntMemberDto,
    CreateOrEditMntMemberAddressDto,
    CreateOrEditMntMemberIdentityDto,
    CreateOrEditMntEconomicInfoDto,
} from '@shared/service-proxies/service-proxies';
import { GetMntMemberFileForUserEditDto } from '../members/mntMemberFile/GetMntMemberFileForUserEditDto';

export interface ICreateOrEditMntMemberComplementDto {
    MemberPersonalData: CreateOrEditMntMemberDto | undefined;
    MemberAddress: CreateOrEditMntMemberAddressDto | undefined;
    MemberIdentity: CreateOrEditMntMemberIdentityDto | undefined;
    MemberEconomicInfo: CreateOrEditMntEconomicInfoDto | undefined;
    MemberFiles: GetMntMemberFileForUserEditDto[] | undefined;
}
