import { IGetCatStateForEditOutput } from './IGetCatStateForEditOutput';
import { CreateOrEditCatStateDto } from './CreateOrEditCatStateDto';

export class GetCatStateForEditOutput implements IGetCatStateForEditOutput {
    catState!: CreateOrEditCatStateDto;
    catCountryTitle!: string | undefined;

    constructor(data?: IGetCatStateForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatStateForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatStateForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catState = _data['catState'] ? CreateOrEditCatStateDto.fromJS(_data['catState']) : <any>undefined;
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
