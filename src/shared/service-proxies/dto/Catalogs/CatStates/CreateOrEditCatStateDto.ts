import { ICreateOrEditCatStateDto } from './ICreateOrEditCatStateDto';

export class CreateOrEditCatStateDto implements ICreateOrEditCatStateDto {
    title!: string;
    order!: number | undefined;
    publish!: boolean;
    catCountryId!: number;
    id!: number | undefined;

    constructor(data?: ICreateOrEditCatStateDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOrEditCatStateDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateOrEditCatStateDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data['title'];
            this.order = _data['order'];
            this.publish = _data['publish'];
            this.catCountryId = _data['catCountryId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['title'] = this.title;
        data['order'] = this.order;
        data['publish'] = this.publish;
        data['catCountryId'] = this.catCountryId;
        data['id'] = this.id;
        return data;
    }
}
