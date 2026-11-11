import { useCallback, useEffect, useState } from 'react';
import { subscribePreviewState } from '../../api/previewState';

export type ResourceState<T> =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly error: string }
  | { readonly status: 'data'; readonly data: T };

export function useApiResource<T>(load: () => Promise<T>) {
  const [resource, setResource] = useState<ResourceState<T>>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [previewRevision, setPreviewRevision] = useState(0);

  useEffect(() => subscribePreviewState(() => setPreviewRevision((current) => current + 1)), []);

  useEffect(() => {
    let active = true;
    setResource({ status: 'loading' });
    Promise.resolve().then(load).then(
      (data) => { if (active) setResource({ status: 'data', data }); },
      (error: unknown) => {
        if (active) setResource({ status: 'error', error: error instanceof Error ? error.message : 'Something went wrong.' });
      },
    );
    return () => { active = false; };
  }, [attempt, load, previewRevision]);

  const retry = useCallback(() => setAttempt((current) => current + 1), []);
  return { resource, retry };
}
