import { Button, Card, Text } from '@fluentui/react-components';
import { getPreviewState, setPreviewState, type PreviewDataState } from '../../api/previewState';
import { useEffect, useState } from 'react';

const states: readonly PreviewDataState[] = ['data', 'loading', 'empty', 'error'];

export function PreviewStateSwitcher() {
  const [active, setActive] = useState(getPreviewState());

  useEffect(() => {
    const update = () => setActive(getPreviewState());
    window.addEventListener('storage', update);
    return () => window.removeEventListener('storage', update);
  }, []);

  return (
    <Card className="preview-switcher" aria-label="Demo data state controls">
      <Text size={100} weight="semibold">Preview state</Text>
      <div className="preview-switcher__buttons">
        {states.map((state) => (
          <Button
            appearance={active === state ? 'primary' : 'subtle'}
            key={state}
            onClick={() => { setPreviewState(state); setActive(state); }}
            size="small"
          >{state[0].toUpperCase() + state.slice(1)}</Button>
        ))}
      </div>
    </Card>
  );
}
