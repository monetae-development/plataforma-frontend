/* tslint:disable:no-unused-variable */

import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { API_BASE_URL as API_BASE_URL_CATALOGS } from '@shared/service-proxies/service-catalogs-proxies';
import { API_BASE_URL as API_BASE_URL_COMMON } from '@shared/service-proxies/service-common-proxies';
import { API_BASE_URL as API_BASE_URL_MEMBERS } from '@shared/service-proxies/service-members-proxies';
import { API_BASE_URL as API_BASE_URL_OTC } from '@shared/service-proxies/service-otc-proxies';
import { API_BASE_URL as API_BASE_URL_SETTINGS_PLATFORM } from '@shared/service-proxies/service-settings-platform-proxies';
import { RootModule } from '../root.module';
import { AppComponent } from './app.component';
import { LOCALE_ID } from '@angular/core';

export function getRemoteServiceBaseUrl(): string {
    return 'http://54.172.191.16';
}

describe('App: Plataforma', () => {
    // Remove freezeui loading animation
    (window as any).FreezeUI = function () { };
    (window as any).UnFreezeUI = function () { };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RootModule],
            providers: [
                { provide: API_BASE_URL, useValue: getRemoteServiceBaseUrl() },
                { provide: API_BASE_URL_CATALOGS, useValue: getRemoteServiceBaseUrl() },
                { provide: API_BASE_URL_COMMON, useValue: getRemoteServiceBaseUrl() },
                { provide: API_BASE_URL_MEMBERS, useValue: getRemoteServiceBaseUrl() },
                { provide: API_BASE_URL_OTC, useValue: getRemoteServiceBaseUrl() },
                { provide: API_BASE_URL_SETTINGS_PLATFORM, useValue: getRemoteServiceBaseUrl() },
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: LOCALE_ID, useValue: 'en' },
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
