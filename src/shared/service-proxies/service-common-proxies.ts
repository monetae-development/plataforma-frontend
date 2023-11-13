/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { PagedResultOfSelectDto } from './dto/Common/SelectInput/PagedResultOfSelectDto';
import { PagedResultOfSelectSubtitleDto } from './dto/Common/SelectInput/PagedResultOfSelectSubtitleDto';
import { Helpers } from './service-helpers';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ServiceCommonProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    getSelectOptions(service: string, filter: number | null | undefined): Observable<PagedResultOfSelectDto> {
        let url_ = this.baseUrl + '/api/services/app/' + service;
        if (filter !== undefined && filter !== null){
            url_ += '?Id=' + encodeURIComponent('' + filter);
        }

        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetOptions(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetOptions(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfSelectDto>><any>_observableThrow(e);
                }
            } else{
                return <Observable<PagedResultOfSelectDto>><any>_observableThrow(response_);
            }
        }));
    }

    protected processGetOptions(response: HttpResponseBase): Observable<PagedResultOfSelectDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {};
        if (response.headers){
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PagedResultOfSelectDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf<PagedResultOfSelectDto>(<any>null);
    }

    getSelectSubtitleOptions(service: string, filter: number | null | undefined): Observable<PagedResultOfSelectSubtitleDto> {
        let url_ = this.baseUrl + '/api/services/app/' + service;
        if (filter !== undefined && filter !== null){
            url_ += '?Id=' + encodeURIComponent('' + filter);
        }

        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetSubtitleOptions(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetSubtitleOptions(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfSelectSubtitleDto>><any>_observableThrow(e);
                }
            } else{
                return <Observable<PagedResultOfSelectSubtitleDto>><any>_observableThrow(response_);
            }
        }));
    }

    protected processGetSubtitleOptions(response: HttpResponseBase): Observable<PagedResultOfSelectSubtitleDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {};
        if (response.headers){
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = PagedResultOfSelectSubtitleDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf<PagedResultOfSelectSubtitleDto>(<any>null);
    }
}
