import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './components/news-list/news-list.component';
import { TextSectionModule } from '../text-section/text-section.module';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

@NgModule({
    declarations: [
        NewsListComponent,
        NewsDetailComponent
    ],
    imports: [
        CommonModule,
        TextSectionModule
    ],
    exports: [
        NewsListComponent,
        NewsDetailComponent
    ]
})
export class NewsModule { }
