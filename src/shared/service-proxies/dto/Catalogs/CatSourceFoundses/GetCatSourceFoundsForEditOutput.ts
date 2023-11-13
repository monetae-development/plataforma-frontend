import { IGetCatSourceFoundsForEditOutput } from './IGetCatSourceFoundsForEditOutput';
import { CreateOrEditCatSourceFoundsDto } from './CreateOrEditCatSourceFoundsDto';

export class GetCatSourceFoundsForEditOutput implements IGetCatSourceFoundsForEditOutput {
    catSourceFounds!: CreateOrEditCatSourceFoundsDto;

    constructor(data?: IGetCatSourceFoundsForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatSourceFoundsForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatSourceFoundsForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catSourceFounds = _data['catSourceFounds'] ? CreateOrEditCatSourceFoundsDto.fromJS(_data['catSourceFounds']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catSourceFounds'] = this.catSourceFounds ? this.catSourceFounds.toJSON() : <any>undefined;
        return data;
    }
}
