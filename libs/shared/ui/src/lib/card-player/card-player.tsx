import { Video } from '@onvu/shared/types';

const defaults: Video = {
  id: '1',
  title: 'INXS - Need You Tonight',
  subtitle: 'Legendary Australian rock band',
  thumbnail:
    'https://cdn.shopify.com/s/files/1/0387/3509/products/inxs_remix_1024x1024.jpg?v=1453621549',
  category: 'Music Video',
  creator: 'Sean Knowles',
  description: '80s Music description of the greatest hits of the 80s',
  duration: '3:30',
  hashtags: ['hashtag1', 'hashtag2'],
  uploadedAt: '2020-01-01',
  url: 'https://www.youtube.com/watch?v=5fGfjJcmmgE',
};

export function CardPlayer(props: Video) {
  return (
    <div className="flex flex-col cursor-pointer overflow-hidden w-80 rounded-lg shadow-lg">
      <div className="flex-shrink-0 justify-center align-middle">
        {props.thumbnail && (
          <img
            className="h-64 w-full object-fit"
            src={props.thumbnail || defaults.thumbnail}
            alt=""
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <a href={props.category || '80s Music'} className="hover:underline">
              {props.category}
            </a>
          </p>
          <a href={props.thumbnail} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">
              {props.title || defaults.title}
            </p>
            <p className="mt-3 text-base text-gray-500">
              {props.description || defaults.description}
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={props.creator}>
              <span className="sr-only">{props.creator}</span>
              <img
                className="h-10 w-10 rounded-full"
                src={props.thumbnail || defaults.thumbnail}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href={props.creator} className="hover:underline">
                {props.creator || defaults.creator}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={props.uploadedAt}>
                {props.uploadedAt || defaults.uploadedAt}
              </time>
              <span>{props.duration || defaults.duration} duration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPlayer;
