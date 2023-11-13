import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformSettingsComponent } from '@app/admin/settings-platform/platform-settings.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformSettingsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlatformSettingsRoutingModule {}
