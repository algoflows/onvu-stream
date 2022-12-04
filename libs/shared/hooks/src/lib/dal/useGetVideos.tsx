import { useEffect, useState } from 'react';

export interface UseGetVideosProps {
  url?: string;
  mocks?: any;
}

export function useGetVideos(props: UseGetVideosProps) {
  const { url, mocks } = props;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (mocks) {
          setInterval(() => {
            setVideos(mocks);
            setLoading(false);
          }, 1500);
        }
        if (url) {
          const response = await fetch(url);
          const json = await response.json();
          setVideos(json);
        }
      } catch (error) {
        if (error) setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [mocks, url]);

  return { videos, loading, error };
}

export default useGetVideos;
