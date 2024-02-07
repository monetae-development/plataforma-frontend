import { IGetAllMemberPortfolioRequestDto } from "./IGetAllMemberPortfolioRequestDto";

export class GetAllMemberPortfolioRequestDto implements IGetAllMemberPortfolioRequestDto {
    folio: string;
    percent24H: number;
    totalPercent: number;
    cost: number;
    id: number;

    constructor(data?: IGetAllMemberPortfolioRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetAllMemberPortfolioRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetAllMemberPortfolioRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.folio = _data['folio'];
            this.percent24H = _data['percent24H'];
            this.totalPercent = _data['totalPercent'];
            this.cost = _data['cost'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data['folio'] = this.folio;
        data['percent24H'] = this.percent24H;
        data['totalPercent'] = this.totalPercent;
        data['cost'] = this.cost;
        data['id'] = this.id;
        return data;
    }
}
