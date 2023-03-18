import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalLink } from 'src/app/types/InternalPath';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.sass']
})
export class NewsDetailComponent {
    public newsId: string | null;

    public constructor(
        public readonly titleService: Title,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.titleService.setTitle('Nachricht');
        this.newsId = this.route.snapshot.paramMap.get('id');
        if (this.newsId === null)
            this.router.navigateByUrl(InternalLink.all['nachrichten'].link);
    }
}
