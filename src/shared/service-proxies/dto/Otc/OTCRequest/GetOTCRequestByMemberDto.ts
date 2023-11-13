import { IGetOTCRequestByMemberDto } from './IGetOTCRequestByMemberDto';
import { OTCRequestForMemberDto } from './OTCRequestForMemberDto';
import { OTCCoinForMemberDto } from '../OTCCoins/OTCCoinForMemberDto';

export class GetOTCRequestByMemberDto implements IGetOTCRequestByMemberDto {
    otcRequest!: OTCRequestForMemberDto;
    otcCoinFk!: OTCCoinForMemberDto;

    constructor(data?: IGetOTCRequestByMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetOTCRequestByMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetOTCRequestByMemberDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.otcRequest = _data['otcRequest'] ? OTCRequestForMemberDto.fromJS(_data['otcRequest']) : <any>undefined;
            this.otcCoinFk = _data['otcCoinFk'] ? OTCCoinForMemberDto.fromJS(_data['otcCoinFk']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['otcRequest'] = this.otcRequest ? this.otcRequest.toJSON() : <any>undefined;
        data['otcCoinFk'] = this.otcCoinFk ? this.otcCoinFk.toJSON() : <any>undefined;
        return data;
    }
}
