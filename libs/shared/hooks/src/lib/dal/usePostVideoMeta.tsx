import { useCallback, useEffect, useState } from 'react';
import type { VideoMeta } from '@onvu/shared/types';

export interface UsePostVideoMetaProps {
  url: string;
  data: VideoMeta;
  status: string;
}

export function usePostVideoMeta(props: UsePostVideoMetaProps) {
  const { url, data } = props;
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  const postVideoMeta = useCallback(async () => {
    try {
      console.log('POSTING META', data);
      // const response = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // const json = await response.json();
      // setResult(json);
      setLoading(false);
    } catch (e) {
      setError(!e);
      setLoading(false);
    }
  }, [url, data]);

  useEffect(() => {
    if (props.status === 'done') {
      postVideoMeta();
    }
  }, [props.status, postVideoMeta]);

  return { result, loading, error };
}

export default usePostVideoMeta;
