export interface BaseURL {
  name: string;
  url: string;
}

export const baseUrls: BaseURL[] = {
  name: 'save-video-metadata',
  url: 'https://save-video-metadata-dev-1-0-0.herokuapp.com',
  name: 'get-s3-signed-url',
  url: 'https://get-s3-signed-url-dev-1-0-0.herokuapp.com',
};
