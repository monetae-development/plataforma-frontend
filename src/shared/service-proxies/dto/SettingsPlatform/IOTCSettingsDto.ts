export interface IOTCSettingsDto {
    apiUrl: string;
    apiKey: string;
    baseFee: number;
    tradingFee: number;
    tax: number;
    currency: string;
    redisChannel: string;
    notifyPhones: string[];
    notifyEmails: string[];
}
