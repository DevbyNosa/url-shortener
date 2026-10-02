// client/src/types.ts
export interface Link {
  id: number;
  code: string;
  url: string;
  shortUrl: string;
  createdAt: string;
}

export interface CreateLinkResponse {
  code: string;
  shortUrl: string;
  url: string;
  createdAt: string;
}

export interface LinksListResponse {
  links: Link[];
}