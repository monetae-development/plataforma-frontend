import { ICatStateDto } from './ICatStateDto';

export class CatStateDto implements ICatStateDto {
    title!: string | undefined;
    order!: number | undefined;
    publish!: boolean;
    catCountryId!: number;
    id!: number;

    constructor(data?: ICatStateDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CatStateDto {
        data = typeof data === 'object' ? data : {};
        let result = new CatStateDto();
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
