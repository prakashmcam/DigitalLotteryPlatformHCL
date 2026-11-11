import type { ReactNode } from 'react';
import { Text, Title3 } from '@fluentui/react-components';

interface SectionHeadingProps {
  readonly title: string;
  readonly detail?: string;
  readonly icon: ReactNode;
}

export function SectionHeading({ title, detail, icon }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__title">
        <span className="section-heading__icon" aria-hidden="true">{icon}</span>
        <Title3>{title}</Title3>
      </div>
      {detail && <Text className="section-heading__detail" size={200}>{detail}</Text>}
    </div>
  );
}
