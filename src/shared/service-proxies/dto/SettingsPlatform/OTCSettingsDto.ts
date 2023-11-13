import { IOTCSettingsDto } from './IOTCSettingsDto'

export class OTCSettingsDto implements IOTCSettingsDto {
    apiUrl!: string;
    apiKey!: string;
    baseFee!: number;
    tradingFee!: number;
    tax!: number;
    currency!: string;
    redisChannel!: string;
    notifyPhones!: string[];
    notifyEmails!: string[];

    constructor(data?: IOTCSettingsDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): OTCSettingsDto {
        data = typeof data === 'object' ? data : {};
        let result = new OTCSettingsDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.apiUrl = _data['apiUrl'];
            this.apiKey = _data['apiKey'];
            this.baseFee = _data['baseFee'];
            this.tradingFee = _data['tradingFee'];
            this.tax = _data['tax'];
            this.currency = _data['currency'];
            this.redisChannel = _data['redisChannel'];
            this.notifyPhones = _data['notifyPhonesRs'];
            this.notifyEmails = _data['notifyEmailsRs'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['apiUrl'] = this.apiUrl;
        data['apiKey'] = this.apiKey;
        data['baseFee'] = this.baseFee;
        data['tradingFee'] = this.tradingFee;
        data['tax'] = this.tax;
        data['currency'] = this.currency;
        data['redisChannel'] = this.redisChannel;
        data['notifyPhonesRs'] = this.notifyPhones;
        data['notifyEmailsRs'] = this.notifyEmails;
        return data;
    }
}
