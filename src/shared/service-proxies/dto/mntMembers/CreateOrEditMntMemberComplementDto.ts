import { ICreateOrEditMntMemberComplementDto } from './ICreateOrEditMntMemberComplementDto';
import {CreateOrEditMntMemberDto,
    CreateOrEditMntMemberAddressDto,
    CreateOrEditMntMemberIdentityDto,
    CreateOrEditMntEconomicInfoDto,
    CreateOrEditMntMemberPepDto,
} from '@shared/service-proxies/service-proxies';

export class CreateOrEditMntMemberComplementDto implements ICreateOrEditMntMemberComplementDto{
    MemberPersonalData: CreateOrEditMntMemberDto;
    MemberAddress: CreateOrEditMntMemberAddressDto;
    MemberIdentity: CreateOrEditMntMemberIdentityDto;
    MemberEconomicInfo: CreateOrEditMntEconomicInfoDto;
    IsPep: boolean;
    MemberPep: CreateOrEditMntMemberPepDto;

    constructor(data?: CreateOrEditMntMemberComplementDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditMntMemberComplementDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditMntMemberComplementDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.MemberPersonalData = _data['MemberPersonalData'];
            this.MemberAddress = _data['MemberAddress'];
            this.MemberIdentity = _data['MemberIdentity'];
            this.MemberEconomicInfo = _data['MemberEconomicInfo'];
            this.IsPep = _data['IsPep'];
            this.MemberPep = _data['MemberPep'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['MemberPersonalData'] = this.MemberPersonalData ;
        data['MemberAddress'] = this.MemberAddress;
        data['MemberIdentity'] = this.MemberIdentity;
        data['MemberEconomicInfo'] = this.MemberEconomicInfo;
        data['IsPep'] = this.IsPep;
        data['MemberPep'] = this.MemberPep;
        return data;
    }
}
