import { ICreateOrEditCatIdentityTypeDto } from './ICreateOrEditCatIdentityTypeDto';

export class CreateOrEditCatIdentityTypeDto implements ICreateOrEditCatIdentityTypeDto {
    title!: string;
    publish!: boolean;
    id!: number | undefined;

    constructor(data?: ICreateOrEditCatIdentityTypeDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditCatIdentityTypeDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditCatIdentityTypeDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data['title'];
            this.publish = _data['publish'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['title'] = this.title;
        data['publish'] = this.publish;
        data['id'] = this.id;
        return data;
    }
}
