import { ICreateMntMemberFiatOutput } from './ICreateMntMemberFiatOutput';

export class CreateMntMemberFiatOutput implements ICreateMntMemberFiatOutput {
    folio!: string;

    constructor(data?: CreateMntMemberFiatOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateMntMemberFiatOutput {
        data = typeof data === 'object' ? data : {};
        let result = new CreateMntMemberFiatOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.folio = _data['folio'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['folio'] = this.folio;
        return data;
    }
}

