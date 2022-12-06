import { CardPlayer } from '@onvu/shared/ui';
import { useGetVideos } from '@onvu/shared/hooks';
import { homeFeedResponse } from '../../data/home-feed-response';
import type { Video } from '@onvu/shared/types';

/* eslint-disable-next-line */
export interface HomeProps {}

const getVideosUrl =
  'https://vt6ynaq4uf4z2exczsarzmsfo40vgnaj.lambda-url.eu-west-1.on.aws/';

export function Home(props: HomeProps) {
  const { videos, loading } = useGetVideos({
    url: getVideosUrl,
  });
  console.log(videos);
  return (
    <div className="flex w-full min-h-full justify-center">
      {loading && <h1>Loading...</h1>}
      <div className="flex-col min-h-full">
        {videos.map((video: Video) => (
          <div key={video.id} className="mt-12">
            <CardPlayer {...video} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
