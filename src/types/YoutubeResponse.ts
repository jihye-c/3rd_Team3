export interface YoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Items[];
}

export interface Items {
  kind: string;
  etag: string;
  id: {kind: string; videoId: string};
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {default: Thumbnail; medium: Thumbnail; high: Thumbnail};
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
