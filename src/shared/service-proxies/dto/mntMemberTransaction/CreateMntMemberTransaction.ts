import { ICreateMntMemberTransaction } from './ICreateMntMemberTransaction';

export class CreateMntMemberTransaction implements ICreateMntMemberTransaction {
    address: string;
    tag!: string;
    web3CryptoCurrencyId: number;
    blockchainNetworkId: number;
    networkFee: number;
    amount: number;

    constructor(data?: ICreateMntMemberTransaction) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateMntMemberTransaction {
        data = typeof data === 'object' ? data : {};
        let result = new CreateMntMemberTransaction();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.address = _data['address'];
            this.tag = _data['tag'];
            this.web3CryptoCurrencyId = _data['web3CryptoCurrencyId'];
            this.blockchainNetworkId = _data['blockchainNetworkId'];
            this.networkFee = _data['networkFee'];
            this.amount = _data['amount'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['address'] = this.address;
        data['tag'] = this.tag;
        data['web3CryptoCurrencyId'] = this.web3CryptoCurrencyId;
        data['blockchainNetworkId'] = this.blockchainNetworkId;
        data['networkFee'] = this.networkFee;
        data['amount'] = this.amount;
        return data;
    }
}
