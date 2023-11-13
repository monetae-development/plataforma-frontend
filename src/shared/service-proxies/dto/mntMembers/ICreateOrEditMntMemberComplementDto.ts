import {CreateOrEditMntMemberDto,
    CreateOrEditMntMemberAddressDto,
    CreateOrEditMntMemberIdentityDto,
    CreateOrEditMntEconomicInfoDto,
    CreateOrEditMntMemberPepDto
} from '@shared/service-proxies/service-proxies';

export interface ICreateOrEditMntMemberComplementDto {
    MemberPersonalData: CreateOrEditMntMemberDto;
    MemberAddress: CreateOrEditMntMemberAddressDto;
    MemberIdentity: CreateOrEditMntMemberIdentityDto;
    MemberEconomicInfo: CreateOrEditMntEconomicInfoDto;
    IsPep: boolean;
    MemberPep: CreateOrEditMntMemberPepDto;
}
