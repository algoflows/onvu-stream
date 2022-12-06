import { useEffect, useState } from 'react';
import type { VideoMeta } from '@onvu/shared/types';

export interface UsePostVideoMetaProps {
  url: string;
  data: { meta: VideoMeta };
  status: string;
}

export function usePostVideoMeta(props: UsePostVideoMetaProps) {
  const { url, data } = props;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { meta } = data;

  useEffect(() => {
    if (props.status === 'done') {
      setLoading(true);
      setError(null);
      console.log('props.status', props.status);
      const postVideoMeta = async () => {
        try {
          // axios post request
          const response = await fetch(url, {
            mode: 'no-cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(meta),
          });
          const { result } = await JSON.parse(response);
          console.log('result', result);
          setResult(result);
          setLoading(false);
        } catch (e) {
          if (e instanceof Error) {
            console.log(e);
            setError(e);
          }
          setLoading(false);
        }
      };
      postVideoMeta();
    }
  }, [props.status]);

  return { result, loading, error };
}

export default usePostVideoMeta;
