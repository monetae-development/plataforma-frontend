import { IGetMntMemberLevelTradingForViewDto } from './IGetMntMemberLevelTradingForViewDto';

export class GetMntMemberLevelTradingForViewDto implements IGetMntMemberLevelTradingForViewDto {
    id: number;
    title!: string | undefined;
    tradingPurchaseFee!: number | undefined;
    tradingSaleFee!: number | undefined;
    default: boolean;

    constructor(data?: IGetMntMemberLevelTradingForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberLevelTradingForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberLevelTradingForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data['id'];
            this.title = _data['title'];
            this.tradingPurchaseFee = _data['tradingPurchaseFee'];
            this.tradingSaleFee = _data['tradingSaleFee'];
            this.default = _data['default'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['title'] = this.title;
        data['tradingPurchaseFee'] = this.tradingPurchaseFee;
        data['tradingSaleFee'] = this.tradingSaleFee;
        data['default'] = this.default;
        return data;
    }
}
