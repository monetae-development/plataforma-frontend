import { IMntMemberTradingResponseDto } from "./IMntMemberTradingResponseDto";

export class MntMemberTradingResponseDto implements IMntMemberTradingResponseDto {
    folio: string| undefined;


    constructor(data?: IMntMemberTradingResponseDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberTradingResponseDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberTradingResponseDto();
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
