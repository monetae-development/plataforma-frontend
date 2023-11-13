import { IGetCatStateForViewDto } from './IGetCatStateForViewDto';
import { CatStateDto } from './CatStateDto';

export class GetCatStateForViewDto implements IGetCatStateForViewDto {
    catState!: CatStateDto;
    catCountryTitle!: string | undefined;

    constructor(data?: IGetCatStateForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatStateForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatStateForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catState = _data['catState'] ? CatStateDto.fromJS(_data['catState']) : <any>undefined;
            this.catCountryTitle = _data['catCountryTitle'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catState'] = this.catState ? this.catState.toJSON() : <any>undefined;
        data['catCountryTitle'] = this.catCountryTitle;
        return data;
    }
}
