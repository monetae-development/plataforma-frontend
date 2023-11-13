import { IGetCatActivityEconomicForViewDto } from './IGetCatActivityEconomicForViewDto';
import { CatActivityEconomicDto } from './CatActivityEconomicDto';

export class GetCatActivityEconomicForViewDto implements IGetCatActivityEconomicForViewDto {
    catActivityEconomic!: CatActivityEconomicDto;
    catActivityEconomicCategoryTitle!: string | undefined;

    constructor(data?: IGetCatActivityEconomicForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatActivityEconomicForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatActivityEconomicForViewDto();
        result.init(data);
        return result;
    }


    init(_data?: any) {
        if (_data) {
            this.catActivityEconomic = _data['catActivityEconomic'] ? CatActivityEconomicDto.fromJS(_data['catActivityEconomic']) : <any>undefined;
            this.catActivityEconomicCategoryTitle = _data['catActivityEconomicCategoryTitle'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catActivityEconomic'] = this.catActivityEconomic ? this.catActivityEconomic.toJSON() : <any>undefined;
        data['catActivityEconomicCategoryTitle'] = this.catActivityEconomicCategoryTitle;
        return data;
    }
}
