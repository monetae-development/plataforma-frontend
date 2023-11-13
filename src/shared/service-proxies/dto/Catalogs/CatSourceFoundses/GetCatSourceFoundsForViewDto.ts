import { IGetCatSourceFoundsForViewDto } from './IGetCatSourceFoundsForViewDto';
import { CatSourceFoundsDto } from './CatSourceFoundsDto';

export class GetCatSourceFoundsForViewDto implements IGetCatSourceFoundsForViewDto {
    catSourceFounds!: CatSourceFoundsDto;

    constructor(data?: IGetCatSourceFoundsForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatSourceFoundsForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatSourceFoundsForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catSourceFounds = _data['catSourceFounds'] ? CatSourceFoundsDto.fromJS(_data['catSourceFounds']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catSourceFounds'] = this.catSourceFounds ? this.catSourceFounds.toJSON() : <any>undefined;
        return data;
    }
}
