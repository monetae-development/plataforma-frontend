import { IGetCatCountryForEditOutput } from './IGetCatCountryForEditOutput';
import { CreateOrEditCatCountryDto } from './CreateOrEditCatCountryDto';

export class GetCatCountryForEditOutput implements IGetCatCountryForEditOutput {
    catCountry!: CreateOrEditCatCountryDto;

    constructor(data?: IGetCatCountryForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatCountryForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatCountryForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catCountry = _data['catCountry'] ? CreateOrEditCatCountryDto.fromJS(_data['catCountry']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catCountry'] = this.catCountry ? this.catCountry.toJSON() : <any>undefined;
        return data;
    }
}
