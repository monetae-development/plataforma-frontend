import { IGetCatNationalityForViewDto } from './IGetCatNationalityForViewDto';
import { CatNationalityDto } from './CatNationalityDto';

export class GetCatNationalityForViewDto implements IGetCatNationalityForViewDto {
    catNationality!: CatNationalityDto;

    constructor(data?: IGetCatNationalityForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatNationalityForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatNationalityForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catNationality = _data['catNationality'] ? CatNationalityDto.fromJS(_data['catNationality']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catNationality'] = this.catNationality ? this.catNationality.toJSON() : <any>undefined;
        return data;
    }
}
