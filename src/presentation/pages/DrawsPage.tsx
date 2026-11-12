import { useCallback } from 'react';
import {
  Badge, Body1, Button, Card, CardFooter, CardHeader, Text, Title1, Title3,
} from '@fluentui/react-components';
import {
  ArrowRightRegular, CalendarLtrRegular, CheckmarkCircleRegular, ClockRegular,
  HistoryRegular, SparkleRegular, TicketDiagonalRegular, TrophyRegular,
} from '@fluentui/react-icons';
import { api } from '../../api';
import type { Draw } from '../../domain/entities/Draw';
import { DataState } from '../components/DataState';
import { HeroMesh } from '../components/HeroMesh';
import { SectionHeading } from '../components/SectionHeading';
import { useApiResource } from '../app/useApiResource';

function DrawCard({ draw }: { readonly draw: Draw }) {
  const isFeatured = draw.status === 'featured';
  return (
    <Card className={`draw-card ${isFeatured ? 'draw-card--featured' : ''}`} appearance="filled-alternative">
      <CardHeader
        image={<span className={`draw-card__icon ${isFeatured ? 'draw-card__icon--gold' : ''}`}><TrophyRegular /></span>}
        header={<div className="draw-card__heading"><Title3 as="h3">{draw.name}</Title3><Text size={200}>{draw.summary}</Text></div>}
        action={<Badge appearance="tint" color={draw.closesIn ? 'warning' : 'success'} icon={draw.closesIn ? <ClockRegular /> : <CheckmarkCircleRegular />}>{draw.closesIn ? `Closes in ${draw.closesIn}` : 'Open'}</Badge>}
      />
      <div className="draw-card__details">
        <Text className="jackpot-value">{draw.jackpot}</Text>
        <Text className="draw-card__meta"><CalendarLtrRegular />{draw.schedule}</Text>
      </div>
      <CardFooter>
        <Text size={200} className="muted-copy">{isFeatured ? 'Featured draw' : draw.name === 'Daily Six' ? 'Draws daily' : 'Weekly draw'}</Text>
        <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after" as="a" href={`/draws/${draw.id}`}>
          Choose numbers
        </Button>
      </CardFooter>
    </Card>
  );
}

export function DrawsPage() {
  const loadDraws = useCallback(() => api.listDraws(), []);
  const { resource, retry } = useApiResource(loadDraws);

  return (
    <DataState
      resource={resource}
      retry={retry}
      isEmpty={(draws) => draws.length === 0}
      emptyTitle="No active draws right now"
      emptyMessage="Check back soon for the next chance to explore a draw."
      emptyAction={<Button appearance="primary" icon={<HistoryRegular />} as="a" href="/results">Browse published results</Button>}
    >
      {(draws) => {
        const featured = draws.find((draw) => draw.status === 'featured') ?? draws[0];
        return (
          <>
            <Card className="hero-card" appearance="filled-alternative">
              <HeroMesh />
              <div className="hero-copy">
                <Text block className="eyebrow eyebrow--light"><span className="eyebrow-dot" />A little possibility, every day</Text>
                <Title1 as="h1" block>Find your next draw.</Title1>
                <Body1 as="p" block>Explore upcoming draws, see what’s at stake, and build a ticket just for fun. Your next moment of possibility starts here.</Body1>
                <div className="hero-actions">
                  <Button appearance="primary" className="button-gold" icon={<TicketDiagonalRegular />} as="a" href={`/draws/${featured.id}`}>Choose numbers</Button>
                  <Button appearance="subtle" className="button-hero-quiet" icon={<HistoryRegular />} as="a" href="/results">See recent results</Button>
                </div>
              </div>
              <div className="hero-prize">
                <Text className="hero-prize__label"><SparkleRegular />Tonight’s featured jackpot</Text>
                <Text className="hero-prize__amount">{featured.jackpot}</Text>
                <Text className="hero-prize__meta"><CalendarLtrRegular />{featured.name} · {featured.schedule}</Text>
                {featured.closesIn && <Text className="hero-prize__meta"><ClockRegular />Closes in {featured.closesIn}</Text>}
              </div>
            </Card>
            <section className="content-section" aria-labelledby="active-draws-title">
              <SectionHeading title="Active draws" detail="Three ways to play" icon={<CalendarLtrRegular />} />
              <div className="draw-grid">
                {draws.map((draw) => <DrawCard draw={draw} key={draw.id} />)}
              </div>
            </section>
            <Card className="assurance-strip" appearance="outline">
              <span className="assurance-strip__icon"><CheckmarkCircleRegular /></span>
              <div><Text weight="semibold">A demo, not a transaction</Text><Text size={200}>Selections stay in this browser session and never create or reserve a ticket.</Text></div>
              <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after" as="a" href="/tickets">View sample tickets</Button>
            </Card>
          </>
        );
      }}
    </DataState>
  );
}
