/* eslint-disable @typescript-eslint/member-ordering */
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { PagedResultOfSelectDto } from './dto/Common/SelectInput/PagedResultOfSelectDto';
import { GetMntMemberIsCompletedOutput } from './dto/mntMembers/GetMntMemberIsCompletedOutput';
import { CreateOrEditMntMemberComplementDto } from '@shared/service-proxies/dto/mntMembers/CreateOrEditMntMemberComplementDto';
import { PRGetMntMemberBankAccountForViewDto } from './dto/members/mntMemberBankAccount/PRGetMntMemberBankAccountForViewDto';
import { GetMntMemberBankAccountForEditOutput } from './dto/members/mntMemberBankAccount/GetMntMemberBankAccountForEditOutput';
import { CreateOrEditMntMemberBankAccountDto } from './dto/members/mntMemberBankAccount/CreateOrEditMntMemberBankAccountDto';
import { GetMntMemberBankAccountForViewDto } from './dto/members/mntMemberBankAccount/GetMntMemberBankAccountForViewDto';
import { PRGetAllMntMemberFiatForViewDto } from './dto/members/mntMemberFiat/PRGetAllMntMemberFiatForViewDto';
import { GetMntMemberFiatForFullViewDto } from './dto/members/mntMemberFiat/GetMntMemberFiatForFullViewDto';
import { CreateMntMemberFiatDto } from './dto/members/mntMemberFiat/CreateMntMemberFiatDto';
import { CreateMntMemberFiatOutput } from './dto/members/mntMemberFiat/CreateMntMemberFiatOutput';
import { CreateMntMemberFiatWithdrawalDto } from './dto/members/mntMemberFiat/CreateMntMemberFiatWithdrawalDto';
import { PRGetPlatformBankAccountForViewMemberDto } from './dto/Platform/PlatformBankAccount/PRGetPlatformBankAccountForViewMemberDto';
import { PRGetAllMntMemberFiatForFullViewDto } from './dto/members/mntMemberFiat/PRGetAllMntMemberFiatForFullViewDto';
import { UpdateMntMemberFiatRequestStatusInput } from './dto/members/mntMemberFiat/UpdateMntMemberFiatRequestStatusInput';
import { Helpers } from './service-helpers';
import { DateTime, Duration } from 'luxon';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ServiceMembersProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : '';
    }

    getIsMemberComplemented(id: number | undefined): Observable<GetMntMemberIsCompletedOutput> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberDataComplements/GetIsMemberComplemented?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetIsMemberComplemented(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetIsMemberComplemented(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetMntMemberIsCompletedOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetMntMemberIsCompletedOutput>;
            }
        }));
    }

    protected processGetIsMemberComplemented(response: HttpResponseBase): Observable<GetMntMemberIsCompletedOutput> {
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
                result200 = GetMntMemberIsCompletedOutput.fromJS(resultData200);
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
    createOrEdit(body: CreateOrEditMntMemberComplementDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberDataComplements/Complement';
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

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => this.processCreateOrEdit(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEdit(response: HttpResponseBase): Observable<void> {
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
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => _observableOf(null as any)));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param filter (optional)
     * @param holderFilter (optional)
     * @param accountFilter (optional)
     * @param swiftFilter (optional)
     * @param statusFilter (optional)
     * @param mntMemberCommentsFilter (optional)
     * @param catBankTitleFilter (optional)
     * @param catAccountTypeTitleFilter (optional)
     * @param catCurrencyTitleFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllBankAccountsByMemmber(filter: string | undefined, holderFilter: string | undefined, accountFilter: string | undefined, swiftFilter: string | undefined, statusFilter: number | undefined, mntMemberCommentsFilter: string | undefined, catBankTitleFilter: string | undefined, catAccountTypeTitleFilter: string | undefined, catCurrencyTitleFilter: string | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRGetMntMemberBankAccountForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberBankAccounts/GetAllByMember?';
        if (filter === null) {
            throw new Error('The parameter \'filter\' cannot be null.');
        } else if (filter !== undefined) {
            url_ += 'Filter=' + encodeURIComponent('' + filter) + '&';
        }
        if (holderFilter === null) {
            throw new Error('The parameter \'holderFilter\' cannot be null.');
        } else if (holderFilter !== undefined) {
            url_ += 'HolderFilter=' + encodeURIComponent('' + holderFilter) + '&';
        }
        if (accountFilter === null) {
            throw new Error('The parameter \'accountFilter\' cannot be null.');
        } else if (accountFilter !== undefined) {
            url_ += 'AccountFilter=' + encodeURIComponent('' + accountFilter) + '&';
        }
        if (swiftFilter === null) {
            throw new Error('The parameter \'swiftFilter\' cannot be null.');
        } else if (swiftFilter !== undefined) {
            url_ += 'SwiftFilter=' + encodeURIComponent('' + swiftFilter) + '&';
        }
        if (statusFilter === null) {
            throw new Error('The parameter \'statusFilter\' cannot be null.');
        } else if (statusFilter !== undefined) {
            url_ += 'StatusFilter=' + encodeURIComponent('' + statusFilter) + '&';
        }
        if (mntMemberCommentsFilter === null) {
            throw new Error('The parameter \'mntMemberCommentsFilter\' cannot be null.');
        } else if (mntMemberCommentsFilter !== undefined) {
            url_ += 'MntMemberCommentsFilter=' + encodeURIComponent('' + mntMemberCommentsFilter) + '&';
        }
        if (catBankTitleFilter === null) {
            throw new Error('The parameter \'catBankTitleFilter\' cannot be null.');
        } else if (catBankTitleFilter !== undefined) {
            url_ += 'CatBankTitleFilter=' + encodeURIComponent('' + catBankTitleFilter) + '&';
        }
        if (catAccountTypeTitleFilter === null) {
            throw new Error('The parameter \'catAccountTypeTitleFilter\' cannot be null.');
        } else if (catAccountTypeTitleFilter !== undefined) {
            url_ += 'CatAccountTypeTitleFilter=' + encodeURIComponent('' + catAccountTypeTitleFilter) + '&';
        }
        if (catCurrencyTitleFilter === null) {
            throw new Error('The parameter \'catCurrencyTitleFilter\' cannot be null.');
        } else if (catCurrencyTitleFilter !== undefined) {
            url_ += 'CatCurrencyTitleFilter=' + encodeURIComponent('' + catCurrencyTitleFilter) + '&';
        }
        if (sorting === null) {
            throw new Error('The parameter \'sorting\' cannot be null.');
        } else if (sorting !== undefined) {
            url_ += 'Sorting=' + encodeURIComponent('' + sorting) + '&';
        }
        if (skipCount === null) {
            throw new Error('The parameter \'skipCount\' cannot be null.');
        } else if (skipCount !== undefined) {
            url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
        }
        if (maxResultCount === null) {
            throw new Error('The parameter \'maxResultCount\' cannot be null.');
        } else if (maxResultCount !== undefined) {
            url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllBankAccountsByMemmber(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllBankAccountsByMemmber(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetMntMemberBankAccountForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetMntMemberBankAccountForViewDto>;
            }
        }));
    }

    protected processGetAllBankAccountsByMemmber(response: HttpResponseBase): Observable<PRGetMntMemberBankAccountForViewDto> {
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
                result200 = PRGetMntMemberBankAccountForViewDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getBankAccountByMemberForEdit(id: number | undefined): Observable<GetMntMemberBankAccountForEditOutput> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberBankAccounts/GetBankAccountByMemberForEdit?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetBankAccountByMemberForEdit(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetBankAccountByMemberForEdit(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetMntMemberBankAccountForEditOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetMntMemberBankAccountForEditOutput>;
            }
        }));
    }

    protected processGetBankAccountByMemberForEdit(response: HttpResponseBase): Observable<GetMntMemberBankAccountForEditOutput> {
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
                result200 = GetMntMemberBankAccountForEditOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional)
     * @return Success
     */
    getBankAccountByMemberForView(id: number | undefined): Observable<GetMntMemberBankAccountForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberBankAccounts/GetBankAccountByMemberForView?';
        url_ += 'Id=' + encodeURIComponent('' + ((id === null || id === undefined) ? '' : id)) + '&';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetBankAccountByMemberForView(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetBankAccountByMemberForView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetMntMemberBankAccountForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetMntMemberBankAccountForViewDto>;
            }
        }));
    }

    protected processGetBankAccountByMemberForView(response: HttpResponseBase): Observable<GetMntMemberBankAccountForViewDto> {
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
                result200 = GetMntMemberBankAccountForViewDto.fromJS(resultData200);
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
    createOrEditBankAccountByMember(body: CreateOrEditMntMemberBankAccountDto | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberBankAccounts/CreateOrEditByMember';
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

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => this.processCreateOrEditBankAccountByMember(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateOrEditBankAccountByMember(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processCreateOrEditBankAccountByMember(response: HttpResponseBase): Observable<void> {
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

    /**
     * @param id (optional)
     * @return Success
     */
    deleteBankAccountByMember(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberBankAccounts/DeleteByMember?';
        if (id === null) {
            throw new Error('The parameter \'id\' cannot be null.');
        } else if (id !== undefined) {
            url_ += 'Id=' + encodeURIComponent('' + id) + '&';
        }
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
            })
        };

        return this.http.request('delete', url_, options_).pipe(_observableMergeMap((response_: any) => this.processDeleteBankAccountByMember(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeleteBankAccountByMember(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processDeleteBankAccountByMember(response: HttpResponseBase): Observable<void> {
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

    /**
     * @param folioFilter (optional)
     * @param typeFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllFiatRequestsByMemmber(folioFilter: string | undefined, typeFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRGetAllMntMemberFiatForViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberFiat/GetAllRequestsByMember?';
        url_ += 'FolioFilter=' + encodeURIComponent('' + ((folioFilter === null || folioFilter === undefined) ? '' : folioFilter)) + '&';
        url_ += 'TypeFilter=' + encodeURIComponent('' + ((typeFilter === null || typeFilter === undefined) ? '' : typeFilter)) + '&';
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

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllFiatRequestsByMemmber(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllFiatRequestsByMemmber(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetAllMntMemberFiatForViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllMntMemberFiatForViewDto>;
            }
        }));
    }

    protected processGetAllFiatRequestsByMemmber(response: HttpResponseBase): Observable<PRGetAllMntMemberFiatForViewDto> {
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
     * @param id (optional)
     * @return Success
     */
    getMemberFiatForFullView(id: number | undefined): Observable<GetMntMemberFiatForFullViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberFiat/GetFullRequestByMember?';
        url_ += 'Id=' + encodeURIComponent('' + ((id === null || id === undefined) ? '' : id)) + '&';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetMemberFiatForFullView(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetMemberFiatForFullView(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<GetMntMemberFiatForFullViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<GetMntMemberFiatForFullViewDto>;
            }
        }));
    }

    protected processGetMemberFiatForFullView(response: HttpResponseBase): Observable<GetMntMemberFiatForFullViewDto> {
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
                result200 = GetMntMemberFiatForFullViewDto.fromJS(resultData200);
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
    createFiatDepositByMember(body: CreateMntMemberFiatDto | undefined): Observable<CreateMntMemberFiatOutput> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberFiat/CreateDepositByMember';
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

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => this.processCreateFiatDepositByMember(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateFiatDepositByMember(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<CreateMntMemberFiatOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<CreateMntMemberFiatOutput>;
            }
        }));
    }

    protected processCreateFiatDepositByMember(response: HttpResponseBase): Observable<CreateMntMemberFiatOutput> {
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
                result200 = CreateMntMemberFiatOutput.fromJS(resultData200);
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
    createFiatWithdrawalByMember(body: CreateMntMemberFiatWithdrawalDto | undefined): Observable<CreateMntMemberFiatOutput> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberFiat/CreateWithdrawalByMember';
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

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => this.processCreateFiatWithdrawalByMember(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateFiatWithdrawalByMember(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<CreateMntMemberFiatOutput>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<CreateMntMemberFiatOutput>;
            }
        }));
    }

    protected processCreateFiatWithdrawalByMember(response: HttpResponseBase): Observable<CreateMntMemberFiatOutput> {
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
                result200 = CreateMntMemberFiatOutput.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }


    getPlatformBankAccounts(): Observable<PRGetPlatformBankAccountForViewMemberDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberFiatAppService/GetPlatformBankAccounts?';
        url_ = url_.replace(/[?&]$/, '');

        let options_: any = {
            observe: 'response',
            responseType: 'blob',
            headers: new HttpHeaders({
                'Accept': 'text/plain'
            })
        };

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetPlatformBankAccounts(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPlatformBankAccounts(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetPlatformBankAccountForViewMemberDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetPlatformBankAccountForViewMemberDto>;
            }
        }));
    }

    protected processGetPlatformBankAccounts(response: HttpResponseBase): Observable<PRGetPlatformBankAccountForViewMemberDto> {
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
                result200 = PRGetPlatformBankAccountForViewMemberDto.fromJS(resultData200);
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return Helpers.blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => Helpers.throwException('An unexpected server error occurred.', status, _responseText, _headers)));
        }
        return _observableOf(null as any);
    }

    /**
     * @param folioFilter (optional)
     * @param typeFilter (optional)
     * @param sorting (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    getAllFiatRequests(folioFilter: string | undefined, typeFilter: number | undefined, sorting: string | undefined, skipCount: number | undefined, maxResultCount: number | undefined): Observable<PRGetAllMntMemberFiatForFullViewDto> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberFiatRequests/GetAllRequests?';
        url_ += 'FolioFilter=' + encodeURIComponent('' + ((folioFilter === null || folioFilter === undefined) ? '' : folioFilter)) + '&';
        url_ += 'TypeFilter=' + encodeURIComponent('' + ((typeFilter === null || typeFilter === undefined) ? '' : typeFilter)) + '&';
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

        return this.http.request('get', url_, options_).pipe(_observableMergeMap((response_: any) => this.processGetAllFiatRequests(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAllFiatRequests(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<PRGetAllMntMemberFiatForFullViewDto>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<PRGetAllMntMemberFiatForFullViewDto>;
            }
        }));
    }

    protected processGetAllFiatRequests(response: HttpResponseBase): Observable<PRGetAllMntMemberFiatForFullViewDto> {
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
                result200 = PRGetAllMntMemberFiatForFullViewDto.fromJS(resultData200);
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
    updateFiatStatus(body: UpdateMntMemberFiatRequestStatusInput | undefined): Observable<void> {
        let url_ = this.baseUrl + '/api/services/app/MntMemberFiatRequests/UpdateStatus';
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

        return this.http.request('post', url_, options_).pipe(_observableMergeMap((response_: any) => this.processUpdateFiatStatus(response_))).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateFiatStatus(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else {
                return _observableThrow(response_) as any as Observable<void>;
            }
        }));
    }

    protected processUpdateFiatStatus(response: HttpResponseBase): Observable<void> {
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
}
