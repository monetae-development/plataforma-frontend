import { ICatDefaultDto } from './ICatDefaultDto';

export class CatDefaultDto implements ICatDefaultDto {
    id!: number;
    title!: string | undefined;
    publish!: boolean | undefined;

    constructor(data?: ICatDefaultDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CatDefaultDto {
        data = typeof data === 'object' ? data : {};
        let result = new CatDefaultDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.title = _data['title'];
            this.publish = _data['publish'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['title'] = this.title;
        data['publish'] = this.publish;
        return data;
    }
}
