import { IGetCatActivityEconomicCategoryForEditOutput } from './IGetCatActivityEconomicCategoryForEditOutput';
import { CreateOrEditCatActivityEconomicCategoryDto } from './CreateOrEditCatActivityEconomicCategoryDto';

export class GetCatActivityEconomicCategoryForEditOutput implements IGetCatActivityEconomicCategoryForEditOutput {
    catActivityEconomicCategory!: CreateOrEditCatActivityEconomicCategoryDto;

    constructor(data?: IGetCatActivityEconomicCategoryForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatActivityEconomicCategoryForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatActivityEconomicCategoryForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catActivityEconomicCategory = _data['catActivityEconomicCategory'] ? CreateOrEditCatActivityEconomicCategoryDto.fromJS(_data['catActivityEconomicCategory']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catActivityEconomicCategory'] = this.catActivityEconomicCategory ? this.catActivityEconomicCategory.toJSON() : <any>undefined;
        return data;
    }
}
