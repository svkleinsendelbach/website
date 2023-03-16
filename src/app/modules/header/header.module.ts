import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './components/header/header.component';
import { DesktopHeaderComponent } from './components/desktop-header/desktop-header.component';
import { DesktopHeaderItemComponent } from './components/desktop-header-item/desktop-header-item.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { MobileHeaderItemComponent } from './components/mobile-header-item/mobile-header-item.component';

@NgModule({
    declarations: [
        HeaderComponent,
        DesktopHeaderComponent,
        DesktopHeaderItemComponent,
        MobileHeaderComponent,
        MobileHeaderItemComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
