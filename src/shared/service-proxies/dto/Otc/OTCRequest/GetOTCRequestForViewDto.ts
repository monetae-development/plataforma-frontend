import { IGetOTCRequestForViewDto } from './IGetOTCRequestForViewDto';
import { OTCRequestDto } from './OTCRequestDto';

export class GetOTCRequestForViewDto implements IGetOTCRequestForViewDto {
    otcRequest!: OTCRequestDto | undefined;

    constructor(data?: IGetOTCRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetOTCRequestForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetOTCRequestForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            let item = _data['otcRequest'] ?? _data['otcRequest'];
            this.otcRequest = item ? OTCRequestDto.fromJS(item) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['otcRequest'] = this.otcRequest ? this.otcRequest.toJSON() : <any>undefined;
        return data;
    }
}
