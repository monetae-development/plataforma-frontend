import { IGetTradingRequestForViewDto } from './IGetTradingRequestForViewDto';
import { TradingRequestDto } from './TradingRequestDto';

export class GetTradingRequestForViewDto implements IGetTradingRequestForViewDto {
    request!: TradingRequestDto | undefined;

    constructor(data?: IGetTradingRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetTradingRequestForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetTradingRequestForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            let item = _data['request'] ?? _data['request'];
            this.request = item ? TradingRequestDto.fromJS(item) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['request'] = this.request ? this.request.toJSON() : <any>undefined;
        return data;
    }
}
