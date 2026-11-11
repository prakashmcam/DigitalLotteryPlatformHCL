export type PreviewDataState = 'data' | 'loading' | 'empty' | 'error';

const allowedStates: readonly PreviewDataState[] = ['data', 'loading', 'empty', 'error'];
const listeners = new Set<() => void>();
const isDevelopment = import.meta.env.DEV;

function readInitialState(): PreviewDataState {
  if (!isDevelopment) return 'data';
  const queryValue = new URLSearchParams(window.location.search).get('previewState');
  const storedValue = window.localStorage.getItem('previewState');
  const candidate = queryValue ?? storedValue;
  return allowedStates.includes(candidate as PreviewDataState) ? candidate as PreviewDataState : 'data';
}

let currentState: PreviewDataState = readInitialState();

export function getPreviewState(): PreviewDataState {
  return isDevelopment ? currentState : 'data';
}

export function setPreviewState(nextState: PreviewDataState): void {
  if (!isDevelopment || !allowedStates.includes(nextState)) return;
  currentState = nextState;
  window.localStorage.setItem('previewState', nextState);
  listeners.forEach((listener) => listener());
}

export function subscribePreviewState(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function waitForPreviewStateChange(): Promise<void> {
  await new Promise<void>((resolve) => {
    const unsubscribe = subscribePreviewState(() => {
      unsubscribe();
      resolve();
    });
  });
}
