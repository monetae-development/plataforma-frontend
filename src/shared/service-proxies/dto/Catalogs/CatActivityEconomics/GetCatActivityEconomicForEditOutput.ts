import { IGetCatActivityEconomicForEditOutput } from './IGetCatActivityEconomicForEditOutput';
import { CreateOrEditCatActivityEconomicDto } from './CreateOrEditCatActivityEconomicDto';

export class GetCatActivityEconomicForEditOutput implements IGetCatActivityEconomicForEditOutput {
    catActivityEconomic!: CreateOrEditCatActivityEconomicDto;
    catActivityEconomicCategoryTitle!: string | undefined;

    constructor(data?: IGetCatActivityEconomicForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatActivityEconomicForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatActivityEconomicForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catActivityEconomic = _data['catActivityEconomic'] ? CreateOrEditCatActivityEconomicDto.fromJS(_data['catActivityEconomic']) : <any>undefined;
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
