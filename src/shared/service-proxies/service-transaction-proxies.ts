/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { PRGetAllMntMemberTradingForViewDto } from './dto/mntMemberTrading/PRGetAllMntMemberTradingForViewDto';
import { PRGetAllMntMemberTransactionForViewDto } from './dto/mntMemberTransaction/PRGetAllMntMemberTransactionForViewDto';
import { GetAllMntMemberTransactionForDetailDto } from './dto/mntMemberTransaction/GetAllMntMemberTransactionForDetailDto';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ServiceTransactionProxy {

    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    getAllMemberRequests(): Observable<PRGetAllMntMemberTransactionForViewDto> {
        console.log("entra al metodo")
        let url_ = this.baseUrl + '/api/services/app/MntMemberTransaction/GetAllMemberRequests';
        url_ = url_.replace(/[?&]$/, "");

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
}
