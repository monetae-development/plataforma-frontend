import { TradingRequestForMemberDto } from './TradingRequestForMemberDto';
import { TradingCryptoCurrencyForMemberDto } from '../Trading/TradingCryptoCurrency/TradingCryptoCurrencyForMemberDto';

export interface IGetTradingRequestByMemberDto {
    tradingRequest: TradingRequestForMemberDto;
    tradingCryptoCurrencyFk: TradingCryptoCurrencyForMemberDto;
}
