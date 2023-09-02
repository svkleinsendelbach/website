import { CommonModule } from '@angular/common';
import { DesktopHeaderComponent } from './components/desktop-header/desktop-header.component';
import { DesktopHeaderItemComponent } from './components/desktop-header-item/desktop-header-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { MobileHeaderItemComponent } from './components/mobile-header-item/mobile-header-item.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        DesktopHeaderComponent,
        DesktopHeaderItemComponent,
        HeaderComponent,
        MobileHeaderComponent,
        MobileHeaderItemComponent
    ],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        FontAwesomeModule
    ]
})
export class HeaderModule { }
