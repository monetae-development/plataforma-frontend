/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { GetOTCSettingsDto } from './dto/SettingsPlatform/GetOTCSettingsDto';
import { OTCSettingsDto } from './dto/SettingsPlatform/OTCSettingsDto';
import { GetAllMntMemberLevelForViewDto } from './dto/MntMemberLevel/GetAllMntMemberLevelForViewDto';
import { DateTime, Duration } from 'luxon';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class SettingsPlatformServiceProxy {
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
    getOTCSettings(): Observable<GetOTCSettingsDto> {
        let url_ = this.baseUrl + '/api/services/app/PlatformSettings/GetOTCSettings';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                Accept: 'text/plain'
            })
        };

        return this.http
            .request('get', url_, options_)
            .pipe(
                _observableMergeMap((response_: any) => {
                    return this.processGetOTCSettings(response_);
                })
            )
            .pipe(
                _observableCatch((response_: any) => {
                    if (response_ instanceof HttpResponseBase) {
                        try {
                            return this.processGetOTCSettings(response_ as any);
                        } catch (e) {
                            return _observableThrow(e) as any as Observable<GetOTCSettingsDto>;
                        }
                    } else {
                        return _observableThrow(response_) as any as Observable<GetOTCSettingsDto>;
                    }
                })
            );
    }

    protected processGetOTCSettings(response: HttpResponseBase): Observable<GetOTCSettingsDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse
                ? response.body
                : (response as any).error instanceof Blob
                    ? (response as any).error
                    : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(
                _observableMergeMap((_responseText: string) => {
                    let result200: any = null;
                    let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                    result200 = GetOTCSettingsDto.fromJS(resultData200);
                    return _observableOf(result200);
                })
            );
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(
                _observableMergeMap((_responseText: string) => {
                    return Helpers.throwException(
                        'An unexpected server error occurred.',
                        status,
                        _responseText,
                        _headers
                    );
                })
            );
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    updateOTCSettings(body: OTCSettingsDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/PlatformSettings/Update';
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

        return this.http.request('put', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processUpdateOTCSettings(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateOTCSettings(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processUpdateOTCSettings(response: HttpResponseBase): Observable<void> {
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

    /**
     * @return Success
     */
    getLevelsSettings(): Observable<GetAllMntMemberLevelForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/PlatformSettings/GetLevelsSettings';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                Accept: 'text/plain'
            })
        };

        return this.http
            .request('get', url_, options_)
            .pipe(
                _observableMergeMap((response_: any) => {
                    return this.processGetLevelsSettings(response_);
                })
            )
            .pipe(
                _observableCatch((response_: any) => {
                    if (response_ instanceof HttpResponseBase) {
                        try {
                            return this.processGetLevelsSettings(response_ as any);
                        } catch (e) {
                            return _observableThrow(e) as any as Observable<GetAllMntMemberLevelForViewDto>;
                        }
                    } else {
                        return _observableThrow(response_) as any as Observable<GetAllMntMemberLevelForViewDto>;
                    }
                })
            );
    }

    protected processGetLevelsSettings(response: HttpResponseBase): Observable<GetAllMntMemberLevelForViewDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse
                ? response.body
                : (response as any).error instanceof Blob
                    ? (response as any).error
                    : undefined;

        let _headers: any = {};
        if (response.headers) {
            for (let key of response.headers.keys()) {
                _headers[key] = response.headers.get(key);
            }
        }
        if (status === 200) {
            return Helpers.blobToText(responseBlob).pipe(
                _observableMergeMap((_responseText: string) => {
                    let result200: any = null;
                    let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
                    result200 = GetAllMntMemberLevelForViewDto.fromJS(resultData200);
                    return _observableOf(result200);
                })
            );
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(
                _observableMergeMap((_responseText: string) => {
                    return Helpers.throwException(
                        'An unexpected server error occurred.',
                        status,
                        _responseText,
                        _headers
                    );
                })
            );
        }
        return _observableOf(null as any);
    }

    /**
     * @param body (optional)
     * @return Success
     */
    updateLevelsSettings(body: GetAllMntMemberLevelForViewDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/PlatformSettings/UpdateLevels';
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

        return this.http.request('put', url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processUpdateLevelsSettings(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateLevelsSettings(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processUpdateLevelsSettings(response: HttpResponseBase): Observable<void> {
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
