import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: './logout.component.html'
})
export class LogoutComponent extends AppComponentBase implements OnInit {

  public constructor(
    injector: Injector,
    private _router: Router,
    private _authService: AppAuthService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.logout();
  }

  logout(): void {
    this._authService.logout();
  }

}
