import { ICreateOrEditMntMemberComplementDto } from './ICreateOrEditMntMemberComplementDto';
import {
    CreateOrEditMntMemberDto,
    CreateOrEditMntMemberAddressDto,
    CreateOrEditMntMemberIdentityDto,
    CreateOrEditMntEconomicInfoDto,
} from '@shared/service-proxies/service-proxies';
import { GetMntMemberFileForUserEditDto } from '../members/mntMemberFile/GetMntMemberFileForUserEditDto';

export class CreateOrEditMntMemberComplementDto implements ICreateOrEditMntMemberComplementDto {
    MemberPersonalData!: CreateOrEditMntMemberDto;
    MemberAddress!: CreateOrEditMntMemberAddressDto;
    MemberIdentity!: CreateOrEditMntMemberIdentityDto;
    MemberEconomicInfo!: CreateOrEditMntEconomicInfoDto;
    MemberFiles!: GetMntMemberFileForUserEditDto[];

    constructor(data?: ICreateOrEditMntMemberComplementDto) {
        if (data) {

            for (let property in data) {
                if (data.hasOwnProperty(property)) {
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
            this.MemberPersonalData = _data['memberPersonalData'] ? CreateOrEditMntMemberDto.fromJS(_data['memberPersonalData']) : <any>undefined;
            this.MemberAddress = _data['memberAddress'] ? CreateOrEditMntMemberAddressDto.fromJS(_data['memberAddress']) : <any>undefined;
            this.MemberIdentity = _data['memberIdentity'] ? CreateOrEditMntMemberIdentityDto.fromJS(_data['memberIdentity']) : <any>undefined;
            this.MemberEconomicInfo = _data['memberEconomicInfo'] ? CreateOrEditMntEconomicInfoDto.fromJS(_data['memberEconomicInfo']) : <any>undefined;
            if (Array.isArray(_data['memberFiles'])) {
                this.MemberFiles = [] as any;
                for (let item of _data['memberFiles']) {
                    this.MemberFiles?.push(GetMntMemberFileForUserEditDto.fromJS(item));
                }
            }
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['memberPersonalData'] = this.MemberPersonalData ? this.MemberPersonalData.toJSON() : <any>undefined;
        data['memberAddress'] = this.MemberAddress ? this.MemberAddress.toJSON() : <any>undefined;
        data['memberIdentity'] = this.MemberIdentity ? this.MemberIdentity.toJSON() : <any>undefined;
        data['memberEconomicInfo'] = this.MemberEconomicInfo ? this.MemberEconomicInfo.toJSON() : <any>undefined;
        if (Array.isArray(this.MemberFiles)) {
            data['memberFiles'] = [];
            for (let item of this.MemberFiles) {
                data['memberFiles'].push(item.toJSON());
            }
        }
        return data;
    }
}
