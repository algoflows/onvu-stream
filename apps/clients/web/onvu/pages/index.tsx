import { CardPlayer } from '@onvu/shared/ui';
import { useGetVideos } from '@onvu/shared/hooks';
import { homeFeedResponse } from '../mocks/home-feed-response';

export function Index() {
  const { videos, error, loading } = useGetVideos({ mocks: homeFeedResponse });
  console.log(videos);
  return (
    <div className="flex w-full min-h-full justify-center">
      {loading && <h1>Loading...</h1>}
      <div className="flex-col min-h-full">
        {videos.map((video) => (
          <div key={video.id} className="mt-12">
            <CardPlayer {...video} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
