/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { BalanceFiatDto } from './dto/Common/Balance/BalanceFiatDto';
import { PRGetAllTradingCryptoCurrencyForFullViewDto } from './dto/Trading/TradingCryptoCurrency/PRGetAllTradingCryptoCurrencyForFullViewDto';
import { PRGetAllTradingCryptoCurrencyForSimpleViewDto } from './dto/Trading/TradingCryptoCurrency/PRGetAllTradingCryptoCurrencyForSimpleViewDto';
import { PagedResultDtoGetAllCryptoCurrencies } from './dto/mntMemberTrading/PagedResultDtoGetAllCryptoCurrencies';
import { MntMemberTradingRequestDto } from './dto/mntMemberTrading/MntMemberTradingRequestDto';
import { GetCryptoBalanceDto } from './dto/mntMemberTrading/GetCryptoBalanceDto';
import { MntMemberTradingResponseDto } from './dto/mntMemberTrading/MntMemberTradingResponseDto';
import { PRGetAllMntMemberTradingForViewDto } from './dto/mntMemberTrading/PRGetAllMntMemberTradingForViewDto';
import { PRGetAllMntMemberTradingPortfolioForViewDto } from './dto/mntMemberTrading/PRGetAllMntMemberTradingPortfolioForViewDto';
import { GetMemberDetailRequestDto } from './dto/mntMemberTrading/GetMemberDetailRequestDto';


export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ServiceTradingProxy {

    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @param filter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllMemberRequests(filter: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRGetAllMntMemberTradingForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetAllMemberRequests?';
        url_ += 'Filter=' + encodeURIComponent('' + ((filter === null || filter === undefined) ? '' : filter)) + '&';
        url_ += 'Sorting=' + encodeURIComponent('' + ((sorting === null || sorting === undefined) ? '' : sorting)) + '&';
        url_ += 'SkipCount=' + encodeURIComponent('' + ((skipCount === null || skipCount === undefined) ? '' : skipCount)) + '&';
        url_ += 'MaxResultCount=' + encodeURIComponent('' + ((maxResultCount === null || maxResultCount === undefined) ? '' : maxResultCount)) + '&';

        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllMemberRequests(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllMemberRequests(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetAllMntMemberTradingForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllMntMemberTradingForViewDto>;
            }
        }));
    }

    protected processGetAllMemberRequests(response: HttpResponseBase): Observable<PRGetAllMntMemberTradingForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PRGetAllMntMemberTradingForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllMemberPortfolioRequests(filter: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRGetAllMntMemberTradingPortfolioForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetAllMemberPortfolioRequests?';
        url_ += 'Filter=' + encodeURIComponent('' + ((filter === null || filter === undefined) ? '' : filter)) + '&';
        url_ += 'Sorting=' + encodeURIComponent('' + ((sorting === null || sorting === undefined) ? '' : sorting)) + '&';
        url_ += 'SkipCount=' + encodeURIComponent('' + ((skipCount === null || skipCount === undefined) ? '' : skipCount)) + '&';
        url_ += 'MaxResultCount=' + encodeURIComponent('' + ((maxResultCount === null || maxResultCount === undefined) ? '' : maxResultCount)) + '&';

        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllMemberPortfolioRequests(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllMemberPortfolioRequests(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetAllMntMemberTradingPortfolioForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllMntMemberTradingPortfolioForViewDto>;
            }
        }));
    }

    protected processGetAllMemberPortfolioRequests(response: HttpResponseBase): Observable<PRGetAllMntMemberTradingPortfolioForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PRGetAllMntMemberTradingPortfolioForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @return Success
     */

    getFiatBalance(): Observable<BalanceFiatDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetFiatBalance';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetFiatBalance(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetFiatBalance(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<BalanceFiatDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<BalanceFiatDto>;
            }
        }));
    }

    protected processGetFiatBalance(response: HttpResponseBase): Observable<BalanceFiatDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = BalanceFiatDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    getAllCryptoCurrenciesFullFromWebSocket(_responseText: any): PRGetAllTradingCryptoCurrencyForFullViewDto {
        let resultData = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        let result = PRGetAllTradingCryptoCurrencyForFullViewDto.fromJS(resultData);
        return result;
    }

    getAllCryptoCurrenciesSimpleFromWebSocket(_responseText: any): PRGetAllTradingCryptoCurrencyForSimpleViewDto {
        let resultData = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        let result = PRGetAllTradingCryptoCurrencyForSimpleViewDto.fromJS(resultData);
        return result;
    }

    getAllCryptoCurrenciesFull(): Observable<PRGetAllTradingCryptoCurrencyForFullViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetAllCryptoCurrenciesFull';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllCryptoCurrenciesFull(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCryptoCurrenciesFull(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetAllTradingCryptoCurrencyForFullViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllTradingCryptoCurrencyForFullViewDto>;
            }
        }));
    }

    protected processGetAllCryptoCurrenciesFull(response: HttpResponseBase): Observable<PRGetAllTradingCryptoCurrencyForFullViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PRGetAllTradingCryptoCurrencyForFullViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    getAllCryptoCurrenciesSimple(): Observable<PRGetAllTradingCryptoCurrencyForSimpleViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetAllCryptoCurrenciesSimple';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllCryptoCurrenciesSimple(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCryptoCurrenciesSimple(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetAllTradingCryptoCurrencyForSimpleViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllTradingCryptoCurrencyForSimpleViewDto>;
            }
        }));
    }

    protected processGetAllCryptoCurrenciesSimple(response: HttpResponseBase): Observable<PRGetAllTradingCryptoCurrencyForSimpleViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PRGetAllTradingCryptoCurrencyForSimpleViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    getAllCryptoCurrenciesForSelect(): Observable<PagedResultDtoGetAllCryptoCurrencies> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetAllCryptoCurrenciesForSelect';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllCryptoCurrenciesForSelect(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCryptoCurrenciesForSelect(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoGetAllCryptoCurrencies>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoGetAllCryptoCurrencies>;
            }
        }));
    }

    protected processGetAllCryptoCurrenciesForSelect(response: HttpResponseBase): Observable<PagedResultDtoGetAllCryptoCurrencies> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = PagedResultDtoGetAllCryptoCurrencies.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    getCryptoBalance(cryptoCurrencyId: number | undefined): Observable<GetCryptoBalanceDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetCryptoBalance?';
        if (cryptoCurrencyId === null) {
            throw new Error('The parameter \'cryptoCurrencyId\' cannot be null.');
        } else if (cryptoCurrencyId !== undefined) {
            url_ += 'cryptoCurrencyId=' + encodeURIComponent('' + cryptoCurrencyId) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetCryptoBalance(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCryptoBalance(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCryptoBalanceDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCryptoBalanceDto>;
            }
        }));
    }

    protected processGetCryptoBalance(response: HttpResponseBase): Observable<GetCryptoBalanceDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetCryptoBalanceDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    getMemberDetailRequest(requestId: number | undefined): Observable<GetMemberDetailRequestDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetMemberDetailRequest?';
        if (requestId === null) {
            throw new Error('The parameter \'requestId\' cannot be null.');
        } else if (requestId !== undefined) {
            url_ += 'requestId=' + encodeURIComponent('' + requestId) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetMemberDetailRequest(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetMemberDetailRequest(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetMemberDetailRequestDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetMemberDetailRequestDto>;
            }
        }));
    }

    protected processGetMemberDetailRequest(response: HttpResponseBase): Observable<GetMemberDetailRequestDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = GetMemberDetailRequestDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    create(body: MntMemberTradingRequestDto | undefined): Observable<MntMemberTradingResponseDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/Create';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(body);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Content-Type': 'application/json-patch+json',
            })
        };

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => this.processCreate(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<MntMemberTradingResponseDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<MntMemberTradingResponseDto>;
            }
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<MntMemberTradingResponseDto> {
        const status = response.status;
        const responseBlob = response instanceof HttpResponse ? response.body : (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = MntMemberTradingResponseDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }
}
