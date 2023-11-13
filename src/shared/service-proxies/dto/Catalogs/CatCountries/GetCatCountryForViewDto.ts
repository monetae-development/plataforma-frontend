import { IGetCatCountryForViewDto } from './IGetCatCountryForViewDto';
import { CatCountryDto } from './CatCountryDto';

export class GetCatCountryForViewDto implements IGetCatCountryForViewDto {
    catCountry!: CatCountryDto;

    constructor(data?: IGetCatCountryForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatCountryForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatCountryForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catCountry = _data['catCountry'] ? CatCountryDto.fromJS(_data['catCountry']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catCountry'] = this.catCountry ? this.catCountry.toJSON() : <any>undefined;
        return data;
    }
}
