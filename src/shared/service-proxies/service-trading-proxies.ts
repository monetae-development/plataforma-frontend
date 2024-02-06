/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { BalanceFiatDto } from './dto/Common/Balance/BalanceFiatDto';
import { PagedResultDtoGetAllCryptoCurrencies } from './dto/mntMemberTrading/PagedResultDtoGetAllCryptoCurrencies';
import { MntMemberTradingRequestDto } from './dto/mntMemberTrading/MntMemberTradingRequestDto';
import { GetCryptoBalanceDto } from './dto/mntMemberTrading/GetCryptoBalanceDto';
import { MntMemberTradingResponseDto } from './dto/mntMemberTrading/MntMemberTradingResponseDto';
import { PRGetAllMntMemberFiatForViewDto } from './dto/members/mntMemberFiat/PRGetAllMntMemberFiatForViewDto';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ServiceTradingProxy {

    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @param userEmailFilter (optional)
     * @param destinationAddressFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllMemberRequests(userEmailFilter: string | undefined, destinationAddressFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRGetAllMntMemberFiatForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTrading/GetAllMemberRequests?';
        url_ += 'userEmailFilter=' + encodeURIComponent('' + ((userEmailFilter === null || userEmailFilter === undefined) ? '' : userEmailFilter)) + '&';
        url_ += 'destinationAddressFilter=' + encodeURIComponent('' + ((destinationAddressFilter === null || destinationAddressFilter === undefined) ? '' : destinationAddressFilter)) + '&';
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
                    return _observableThrow(e) as any as Observable<PRGetAllMntMemberFiatForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllMntMemberFiatForViewDto>;
            }
        }));
    }

    protected processGetAllMemberRequests(response: HttpResponseBase): Observable<PRGetAllMntMemberFiatForViewDto> {
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
                result200 = PRGetAllMntMemberFiatForViewDto.fromJS(resultData200);
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
        let url_ = this.baseUrl + "/api/services/app/MntMemberTrading/GetFiatBalance";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
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

    getAllCryptoCurrencies(): Observable<PagedResultDtoGetAllCryptoCurrencies> {
        let url_ = this.baseUrl + "/api/services/app/MntMemberTrading/GetAllCryptoCurrencies";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllCryptoCurrencies(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllCryptoCurrencies(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PagedResultDtoGetAllCryptoCurrencies>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PagedResultDtoGetAllCryptoCurrencies>;
            }
        }));
    }

    protected processGetAllCryptoCurrencies(response: HttpResponseBase): Observable<PagedResultDtoGetAllCryptoCurrencies> {
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
