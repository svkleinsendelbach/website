export interface News {
    id: string;
    title: string;
    subtitle?: string;
    date: Date;
    shortDescription?: string;
    newsUrl: string;
    disabled: boolean;
    thumbnailUrl: string;
}

export namespace News {
    export type Flatten = {
        id: string;
        title: string;
        subtitle?: string;
        date: string;
        shortDescription?: string;
        newsUrl: string;
        disabled: boolean;
        thumbnailUrl: string;
    };

    export function flatten(news: News): News.Flatten;
    export function flatten(news: Omit<News, 'id'>): Omit<News.Flatten, 'id'>;
    export function flatten(news: News | Omit<News, 'id'>): News.Flatten | Omit<News.Flatten, 'id'> {
        return {
            ...('id' in news ? { id: news.id } : {}),
            title: news.title,
            subtitle: news.subtitle,
            date: news.date.toISOString(),
            shortDescription: news.shortDescription,
            newsUrl: news.newsUrl,
            disabled: news.disabled,
            thumbnailUrl: news.thumbnailUrl
        };
    }

    export function concrete(news: News.Flatten): News;
    export function concrete(news: Omit<News.Flatten, 'id'>): Omit<News, 'id'>;
    export function concrete(news: News.Flatten | Omit<News.Flatten, 'id'>): News | Omit<News, 'id'> {
        return {
            ...('id' in news ? { id: news.id } : {}),
            title: news.title,
            subtitle: news.subtitle,
            date: new Date(news.date),
            shortDescription: news.shortDescription,
            newsUrl: news.newsUrl,
            disabled: news.disabled,
            thumbnailUrl: news.thumbnailUrl
        };
    }
}
