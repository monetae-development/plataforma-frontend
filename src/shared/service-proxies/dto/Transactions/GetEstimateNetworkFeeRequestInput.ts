import { IGetEstimateNetworkFeeRequestInput } from './IGetEstimateNetworkFeeRequestInput';

export class GetEstimateNetworkFeeRequestInput implements IGetEstimateNetworkFeeRequestInput {
    assetId!: number;
    amount!: number;
    address!: string;
    tag: string | undefined;

    constructor(data?: IGetEstimateNetworkFeeRequestInput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetEstimateNetworkFeeRequestInput {
        data = typeof data === 'object' ? data : {};
        let result = new GetEstimateNetworkFeeRequestInput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.assetId = _data['assetId'];
            this.amount = _data['amount'];
            this.address = _data['address'];
            this.tag = _data['tag'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['assetId'] = this.assetId;
        data['amount'] = this.amount;
        data['address'] = this.address;
        data['tag'] = this.tag;
        return data;
    }
}
