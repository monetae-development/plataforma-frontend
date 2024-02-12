import { IGetCatDefaultForViewDto } from './IGetCatDefaultForViewDto';
import { CatDefaultDto } from './CatDefaultDto';

export class GetCatDefaultForViewDto implements IGetCatDefaultForViewDto {
    record!: CatDefaultDto;

    constructor(data?: IGetCatDefaultForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatDefaultForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatDefaultForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.record = _data['record'] ? CatDefaultDto.fromJS(_data['record']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['record'] = this.record ? this.record.toJSON() : <any>undefined;
        return data;
    }
}
