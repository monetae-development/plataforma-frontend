import { IGetCatProfessionForEditOutput } from './IGetCatProfessionForEditOutput';
import { CreateOrEditCatProfessionDto } from './CreateOrEditCatProfessionDto';

export class GetCatProfessionForEditOutput implements IGetCatProfessionForEditOutput {
    catProfession!: CreateOrEditCatProfessionDto;

    constructor(data?: IGetCatProfessionForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatProfessionForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatProfessionForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catProfession = _data['catProfession'] ? CreateOrEditCatProfessionDto.fromJS(_data['catProfession']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catProfession'] = this.catProfession ? this.catProfession.toJSON() : <any>undefined;
        return data;
    }
}
