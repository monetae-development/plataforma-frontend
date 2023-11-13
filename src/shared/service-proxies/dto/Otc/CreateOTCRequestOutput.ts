import { ICreateOTCRequestOuput } from './ICreateOTCRequestOuput';

export class CreateOTCRequestOutput implements ICreateOTCRequestOuput{
    folio!: string;

    constructor(data?: CreateOTCRequestOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateOTCRequestOutput{
        data = typeof data === 'object' ? data : {};
        let result = new CreateOTCRequestOutput();
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
