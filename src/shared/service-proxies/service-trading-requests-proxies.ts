/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { PRDtoOfGetAllTradingRequestForViewDto } from './dto/TradingRequest/PRDtoOfGetAllTradingRequestForViewDto';
import { DateTime, Duration } from 'luxon';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class TradingRequestsServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    getAllRequests(folioFilter: string | undefined, userNameFilter: string | undefined, cryptoFilter: number | undefined, typeFilter: number | undefined, statusFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRDtoOfGetAllTradingRequestForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/TradingRequests/GetAll?';
        url_ += 'FolioFilter=' + encodeURIComponent('' + ((folioFilter === null || folioFilter === undefined) ? '' : folioFilter)) + '&';
        url_ += 'UserNameFilter=' + encodeURIComponent('' + ((userNameFilter === null || userNameFilter === undefined) ? '' : userNameFilter)) + '&';
        url_ += 'CryptoFilter=' + encodeURIComponent('' + ((cryptoFilter === null || cryptoFilter === undefined) ? '' : cryptoFilter)) + '&';
        url_ += 'TypeFilter=' + encodeURIComponent('' + ((typeFilter === null || typeFilter === undefined) ? -1 : typeFilter)) + '&';
        url_ += 'StatusFilter=' + encodeURIComponent('' + ((statusFilter === null || statusFilter === undefined) ? -1 : statusFilter)) + '&';
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

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllRequests(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllRequests(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRDtoOfGetAllTradingRequestForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRDtoOfGetAllTradingRequestForViewDto>;
            }
        }));
    }

    protected processGetAllRequests(response: HttpResponseBase): Observable<PRDtoOfGetAllTradingRequestForViewDto> {
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
                result200 = PRDtoOfGetAllTradingRequestForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    deleteRequest(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/TradingRequests/Delete?';
        url_ += 'Id=' + encodeURIComponent('' + ((id === null || id === undefined) ? '' : id)) + '&';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processDeleteRequest(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteRequest(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDeleteRequest(response: HttpResponseBase): Observable<void> {
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
                return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
                return Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}
