import { IGetOTCTradingForViewDto } from './IGetOTCTradingForViewDto';
import { OTCTradingForViewDto } from './OTCTradingForViewDto';

export class GetOTCTradingForViewDto implements IGetOTCTradingForViewDto{
    otcCoin!: OTCTradingForViewDto;

    constructor(data?: IGetOTCTradingForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetOTCTradingForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetOTCTradingForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            let item = _data['otcCoin'] ?? _data['OtcCoin'];
            this.otcCoin = item ? OTCTradingForViewDto.fromJS(item) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['otcCoin'] = this.otcCoin ? this.otcCoin.toJSON() : <any>undefined;
        return data;
    }
}
