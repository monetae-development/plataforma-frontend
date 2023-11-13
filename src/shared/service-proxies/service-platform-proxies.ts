/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Helpers } from './service-helpers';
import { GetOTCSettingsDto } from './dto/SettingsPlatform/GetOTCSettingsDto';
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
}
