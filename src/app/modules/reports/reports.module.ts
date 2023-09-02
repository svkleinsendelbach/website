import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportComponent } from './components/report/report.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TextSectionModule } from '../text-section/text-section.module';

@NgModule({
    declarations: [
        ReportComponent,
        ReportsComponent
    ],
    exports: [
        ReportComponent,
        ReportsComponent
    ],
    imports: [
        CommonModule,
        TextSectionModule
    ]
})
export class ReportsModule { }
