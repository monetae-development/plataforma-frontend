import { IGetOTCRequestForViewDto } from './IGetOTCRequestForViewDto';
import { OTCRequestDto } from './OTCRequestDto';

export class GetOTCRequestForViewDto implements IGetOTCRequestForViewDto {
    request!: OTCRequestDto | undefined;

    constructor(data?: IGetOTCRequestForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
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
            let item = _data['request'] ?? _data['request'];
            this.request = item ? OTCRequestDto.fromJS(item) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['request'] = this.request ? this.request.toJSON() : <any>undefined;
        return data;
    }
}
