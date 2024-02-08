
import { IGetMemberDetailRequestDto } from './IGetMemberDetailRequestDto';
import { TradingRequestMemberDto } from './TradingRequestMemberDto';

export class GetMemberDetailRequestDto implements IGetMemberDetailRequestDto {
    tradingRequestMemberDto!: TradingRequestMemberDto | undefined;

    constructor(data?: IGetMemberDetailRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMemberDetailRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMemberDetailRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.tradingRequestMemberDto = _data['tradingRequestMemberDto'] ? TradingRequestMemberDto.fromJS(_data['tradingRequestMemberDto']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['tradingRequestMemberDto'] = this.tradingRequestMemberDto ? this.tradingRequestMemberDto.toJSON() : <any>undefined;
        return data;
    }
}
