import {IGetCatNationalityForEditOutput} from './IGetCatNationalityForEditOutput';
import {CreateOrEditCatNationalityDto} from './CreateOrEditCatNationalityDto';

export class GetCatNationalityForEditOutput implements IGetCatNationalityForEditOutput {
    catNationality!: CreateOrEditCatNationalityDto;

    constructor(data?: IGetCatNationalityForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatNationalityForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatNationalityForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catNationality = _data['catNationality'] ? CreateOrEditCatNationalityDto.fromJS(_data['catNationality']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catNationality'] = this.catNationality ? this.catNationality.toJSON() : <any>undefined;
        return data;
    }
}
