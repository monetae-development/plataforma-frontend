import { IGetCatActivityEconomicCategoryForViewDto  } from './IGetCatActivityEconomicCategoryForViewDto';
import { CatActivityEconomicCategoryDto } from './CatActivityEconomicCategoryDto';

export class GetCatActivityEconomicCategoryForViewDto implements IGetCatActivityEconomicCategoryForViewDto {
    catActivityEconomicCategory!: CatActivityEconomicCategoryDto;

    constructor(data?: IGetCatActivityEconomicCategoryForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatActivityEconomicCategoryForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatActivityEconomicCategoryForViewDto();
        result.init(data);
        return result;
    }


    init(_data?: any) {
        if (_data) {
            this.catActivityEconomicCategory = _data['catActivityEconomicCategory'] ? CatActivityEconomicCategoryDto.fromJS(_data['catActivityEconomicCategory']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catActivityEconomicCategory'] = this.catActivityEconomicCategory ? this.catActivityEconomicCategory.toJSON() : <any>undefined;
        return data;
    }
}
