export interface CardPlayerProps {
  cardTitle: string;
  hashtags?: string[];
  cardSubtitle?: string[];
  cardImageUrl?: string;
  cardImageAlt?: string;
  videoCategory?: string;
  cardImageTitle?: string;
  videoAuthor?: string;
  videoDescription?: string;
  videoDuration?: string;
  videoCreationDate?: string;
  videoViews?: string;
  videoLikes?: string;
  children?: React.ReactNode;
}

const defaults: CardPlayerProps = {
  cardTitle: 'INXS - Need You Tonight',
  hashtags: ['hashtag1', 'hashtag2'],
  cardSubtitle: ['Card Subtitle'],
  cardImageUrl:
    'https://cdn.shopify.com/s/files/1/0387/3509/products/inxs_remix_1024x1024.jpg?v=1453621549',
  cardImageAlt: 'Card Image Alt',
  videoCategory: 'Video Category',
  cardImageTitle: 'Card Image Title',
  videoAuthor: 'Sean Knowles',
  videoDescription: '80s Music description of the greatest hits of the 80s',
  videoDuration: '3:30',
};

export function CardPlayer(props: CardPlayerProps) {
  return (
    <div className="flex flex-col cursor-pointer overflow-hidden w-80 rounded-lg shadow-lg">
      <div className="flex-shrink-0 justify-center align-middle">
        {props.cardImageUrl && (
          <img
            className="h-64 w-full object-fit"
            src={props.cardImageUrl || defaults.cardImageUrl}
            alt=""
          />
        )}
        {!props.cardImageUrl && props.children}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <a
              href={props.videoCategory || '80s Music'}
              className="hover:underline"
            >
              {props.videoCategory}
            </a>
          </p>
          <a href={props.cardImageUrl} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">
              {props.cardTitle || defaults.cardTitle}
            </p>
            <p className="mt-3 text-base text-gray-500">
              {props.videoDescription || defaults.videoDescription}
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={props.videoAuthor}>
              <span className="sr-only">{props.videoAuthor}</span>
              <img
                className="h-10 w-10 rounded-full"
                src={props.cardImageUrl || defaults.cardImageUrl}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href={props.videoAuthor} className="hover:underline">
                {props.videoAuthor || defaults.videoAuthor}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={props.videoCreationDate}>
                {props.videoCreationDate}
              </time>
              <span>
                {props.videoDuration || defaults.videoDuration} duration
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPlayer;
