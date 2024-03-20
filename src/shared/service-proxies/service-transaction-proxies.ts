/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { PRGetAllMntMemberTransactionForViewDto } from './dto/mntMemberTransaction/PRGetAllMntMemberTransactionForViewDto';
import { GetAllMntMemberTransactionForDetailDto } from './dto/mntMemberTransaction/GetAllMntMemberTransactionForDetailDto';
import { PRGetAllCryptoCurrenciesForSelectDto } from './dto/Transactions/PRGetAllCryptoCurrenciesForSelectDto';
import { GetCryptoCurrencyTransactionSendFeeDto } from './dto/MntMemberCryptoCurrencyFee/GetCryptoCurrencyTransactionSendFeeDto';
import { GetEstimateNetworkFeeRequestInput } from './dto/Transactions/GetEstimateNetworkFeeRequestInput';
import { CreateMntMemberTransaction } from './dto/mntMemberTransaction/CreateMntMemberTransaction';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ServiceTransactionProxy {

    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    /**
     * @return Success
     */
    getAllMemberRequests(): Observable<PRGetAllMntMemberTransactionForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTransaction/GetAllMemberRequests';
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
                    return _observableThrow(e) as any as Observable<PRGetAllMntMemberTransactionForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllMntMemberTransactionForViewDto>;
            }
        }));
    }

    protected processGetAllMemberRequests(response: HttpResponseBase): Observable<PRGetAllMntMemberTransactionForViewDto> {
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
                result200 = PRGetAllMntMemberTransactionForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    getMemberDetailRequest(requestId: number | undefined): Observable<GetAllMntMemberTransactionForDetailDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTransaction/GetMemberDetailRequest?';
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
                    return _observableThrow(e) as any as Observable<GetAllMntMemberTransactionForDetailDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetAllMntMemberTransactionForDetailDto>;
            }
        }));
    }

    protected processGetMemberDetailRequest(response: HttpResponseBase): Observable<GetAllMntMemberTransactionForDetailDto> {
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
                result200 = GetAllMntMemberTransactionForDetailDto.fromJS(resultData200);
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
    getCryptoCurrenciesForSelect(): Observable<PRGetAllCryptoCurrenciesForSelectDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTransaction/GetAllCryptoCurrenciesForSelect';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetCryptoCurrenciesForSelect(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCryptoCurrenciesForSelect(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetAllCryptoCurrenciesForSelectDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllCryptoCurrenciesForSelectDto>;
            }
        }));
    }

    protected processGetCryptoCurrenciesForSelect(response: HttpResponseBase): Observable<PRGetAllCryptoCurrenciesForSelectDto> {
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
                result200 = PRGetAllCryptoCurrenciesForSelectDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    getCryptoCurrencyTransactionSendFee(): Observable<GetCryptoCurrencyTransactionSendFeeDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTransaction/GetCryptoCurrencyTransactionSendFee';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetCryptoCurrencyTransactionSendFee(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetCryptoCurrencyTransactionSendFee(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetCryptoCurrencyTransactionSendFeeDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetCryptoCurrencyTransactionSendFeeDto>;
            }
        }));
    }

    protected processGetCryptoCurrencyTransactionSendFee(response: HttpResponseBase): Observable<GetCryptoCurrencyTransactionSendFeeDto> {
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
                result200 = GetCryptoCurrencyTransactionSendFeeDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param assetId (required)
     * @param amount (required)
     * @param address (required)
     * @param tag (optional)
     * @return Success
     */
    getNetworkFeeRequest(assetId: number, amount: number, address: string, tag: string): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTransaction/GetNetworkFeeRequest?';
        url_ += (assetId === null || assetId === undefined) ? '' : 'AssetId=' + encodeURIComponent(assetId) + '&';
        url_ += (amount === null || amount === undefined) ? '' : 'Amount=' + encodeURIComponent(amount) + '&';
        url_ += (address === null || address === undefined) ? '' : 'Address=' + encodeURIComponent(address) + '&';
        url_ += (tag === null || tag === undefined) ? '' : 'Tag=' + encodeURIComponent(tag) + '&';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetNetworkFeeRequest(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetNetworkFeeRequest(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processGetNetworkFeeRequest(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = response instanceof HttpResponse ? response.body : (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => _observableOf(null as any)));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (required)
     * @return Success
     */
    create(body: CreateMntMemberTransaction | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberTransaction/Create';
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
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
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
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => _observableOf(null as any)));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }
}
