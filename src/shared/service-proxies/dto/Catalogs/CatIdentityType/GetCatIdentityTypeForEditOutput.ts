import { IGetCatIdentityTypeForEditOutput } from './IGetCatIdentityTypeForEditOutput';
import { CreateOrEditCatIdentityTypeDto } from './CreateOrEditCatIdentityTypeDto';

export class GetCatIdentityTypeForEditOutput implements IGetCatIdentityTypeForEditOutput {
    catIdentityType!: CreateOrEditCatIdentityTypeDto;

    constructor(data?: IGetCatIdentityTypeForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetCatIdentityTypeForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetCatIdentityTypeForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.catIdentityType = _data['catIdentityType'] ? CreateOrEditCatIdentityTypeDto.fromJS(_data['catIdentityType']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['catIdentityType'] = this.catIdentityType ? this.catIdentityType.toJSON() : <any>undefined;
        return data;
    }
}
