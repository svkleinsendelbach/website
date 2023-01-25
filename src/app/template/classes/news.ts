export interface News {
    id: string,
    title: string;
    subtitle?: string;
    date: Date;
    shortDescription?: string;
    newsUrl: string;
    disabled: boolean;
    thumbnailUrl: string;
}

export namespace News {
    export type CallParameters = {
        title: string;
        subtitle?: string;
        date: string;
        shortDescription?: string;
        newsUrl: string;
        disabled: boolean;
        thumbnailUrl: string;
    }

    export interface ReturnType {
        id: string,
        title: string;
        subtitle?: string;
        date: string;
        shortDescription?: string;
        newsUrl: string;
        disabled: boolean;
        thumbnailUrl: string;
    }

    export namespace ReturnType {
      export function toNews(news: News.ReturnType): News {
        return {
          id: news.id,
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
}
