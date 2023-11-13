import { ICatProfessionDto } from './ICatProfessionDto';

export class CatProfessionDto implements ICatProfessionDto {
    title!: string | undefined;
    risk!: number | undefined;
    order!: number | undefined;
    publish!: boolean;
    id!: number;

    constructor(data?: ICatProfessionDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)){
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CatProfessionDto {
        data = typeof data === 'object' ? data : {};
        let result = new CatProfessionDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data['title'];
            this.risk = _data['risk'];
            this.order = _data['order'];
            this.publish = _data['publish'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['title'] = this.title;
        data['risk'] = this.risk;
        data['order'] = this.order;
        data['publish'] = this.publish;
        data['id'] = this.id;
        return data;
    }
}
