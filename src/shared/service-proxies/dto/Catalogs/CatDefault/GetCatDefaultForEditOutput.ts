import { IGetCatDefaultForEditOutput } from './IGetCatDefaultForEditOutput';
import { CreateOrEditCatDefaultDto } from './CreateOrEditCatDefaultDto';

export class GetCatDefaultForEditOutput implements IGetCatDefaultForEditOutput {
    record!: CreateOrEditCatDefaultDto;

    constructor(data?: IGetCatDefaultForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatDefaultForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatDefaultForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.record = _data['record'] ? CreateOrEditCatDefaultDto.fromJS(_data['record']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['record'] = this.record ? this.record.toJSON() : <any>undefined;
        return data;
    }
}
