import { IUserInfoDto } from './IUserInfoDto';

export class UserInfoDto implements IUserInfoDto {
    name!: string;
    surname!: string;
    userName!: string;
    emailAddress!: string;
    id!: number;

    constructor(data?: IUserInfoDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): UserInfoDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserInfoDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data['name'];
            this.surname = _data['surname'];
            this.userName = _data['userName'];
            this.emailAddress = _data['emailAddress'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['name'] = this.name;
        data['surname'] = this.surname;
        data['usarName'] = this.userName;
        data['emailAddress'] = this.emailAddress;
        data['id'] = this.id;
        return data;
    }
}
