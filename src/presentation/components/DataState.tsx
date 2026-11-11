import type { ReactNode } from 'react';
import {
  Body1, Button, Card, MessageBar, MessageBarBody, MessageBarTitle,
  Skeleton, SkeletonItem, Title3,
} from '@fluentui/react-components';
import { ArrowClockwiseRegular, BoxRegular } from '@fluentui/react-icons';
import type { ResourceState } from '../app/useApiResource';

interface DataStateProps<T> {
  readonly resource: ResourceState<T>;
  readonly retry: () => void;
  readonly isEmpty: (data: T) => boolean;
  readonly emptyTitle: string;
  readonly emptyMessage: string;
  readonly emptyAction: ReactNode;
  readonly children: (data: T) => ReactNode;
}

export function DataState<T>({ resource, retry, isEmpty, emptyTitle, emptyMessage, emptyAction, children }: DataStateProps<T>) {
  if (resource.status === 'loading') {
    return (
      <section className="loading-grid" aria-label="Loading content" aria-busy="true">
        {[0, 1, 2].map((item) => (
          <Card className="loading-card" key={item}>
            <Skeleton>
              <SkeletonItem shape="circle" size={40} />
              <SkeletonItem className="skeleton-line" />
              <SkeletonItem className="skeleton-line skeleton-line--short" />
            </Skeleton>
          </Card>
        ))}
      </section>
    );
  }
  if (resource.status === 'error') {
    return (
      <MessageBar intent="error" className="state-message">
        <MessageBarBody>
          <MessageBarTitle>We couldn’t load this view</MessageBarTitle>
          <Body1>{resource.error}</Body1>
          <Button appearance="primary" icon={<ArrowClockwiseRegular />} onClick={retry}>Retry loading</Button>
        </MessageBarBody>
      </MessageBar>
    );
  }
  if (isEmpty(resource.data)) {
    return (
      <Card className="empty-card" appearance="filled-alternative">
        <BoxRegular className="empty-icon" />
        <Title3>{emptyTitle}</Title3>
        <Body1>{emptyMessage}</Body1>
        {emptyAction}
      </Card>
    );
  }
  return <>{children(resource.data)}</>;
}
