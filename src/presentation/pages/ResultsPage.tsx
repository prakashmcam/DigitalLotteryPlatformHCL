import { useCallback, useState } from 'react';
import {
  Badge, Body1, Button, Card, Tab, TabList, Text, Title1,
} from '@fluentui/react-components';
import {
  ArrowRightRegular, CalendarLtrRegular, ChartMultipleRegular, HistoryRegular,
  NumberSymbolRegular, TrophyRegular,
} from '@fluentui/react-icons';
import { api } from '../../api';
import type { DrawResult } from '../../domain/entities/DrawResult';
import { DataState } from '../components/DataState';
import { NumberBalls } from '../components/NumberBalls';
import { SectionHeading } from '../components/SectionHeading';
import { useApiResource } from '../app/useApiResource';

function ResultRows({ results }: { readonly results: readonly DrawResult[] }) {
  return (
    <Card className="results-table-card" appearance="outline">
      <div className="table-scroll">
        <table className="results-table">
          <caption>Published winning numbers from the three most recent sample draws.</caption>
          <thead><tr><th>Draw</th><th>Draw date</th><th>Winning numbers</th><th>Bonus</th><th>Status</th></tr></thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td><Text weight="semibold">{result.drawName}</Text><Text className="table-subline" size={200}>{result.numbers.length} numbers</Text></td>
                <td><time dateTime={result.isoDate}>{result.date}</time></td>
                <td><NumberBalls label={`${result.drawName} winning numbers`} numbers={result.numbers} /></td>
                <td>{result.bonus === null ? <Text className="muted-copy">—</Text> : <NumberBalls bonus={result.bonus} label="Bonus number" numbers={[]} />}</td>
                <td><Badge appearance="tint" color="success">{result.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footnote">All results shown here are fictional examples for this local demo.</div>
    </Card>
  );
}

export function ResultsPage() {
  const [tab, setTab] = useState('recent');
  const loadResults = useCallback(() => api.listResults(), []);
  const { resource, retry } = useApiResource(loadResults);
  const results = resource.status === 'data' ? resource.data : [];
  const latestResult = results[0];
  const bonusCount = results.filter((result) => result.bonus !== null).length;

  return (
    <>
      <section className="mini-hero mini-hero--results">
        <div>
          <Text block className="eyebrow eyebrow--light"><span className="eyebrow-dot" />Draw outcomes</Text>
          <Title1 as="h1" block>Results, clearly accounted for.</Title1>
          <Body1 as="p" block>Browse recently published outcomes and check every winning number.</Body1>
        </div>
        <div className="mini-hero__action"><Button appearance="primary" className="button-gold" icon={<ArrowRightRegular />} iconPosition="after" as="a" href="/">Explore active draws</Button></div>
      </section>
      <section className="stat-grid" aria-label="Results overview">
        <Card className="stat-card" appearance="outline"><span className="stat-icon"><ChartMultipleRegular /></span><Text size={200}>Published draws</Text><Text className="stat-value">{resource.status === 'data' ? results.length : '—'}</Text><Text size={100}>Recent outcomes available</Text></Card>
        <Card className="stat-card" appearance="outline"><span className="stat-icon stat-icon--gold"><CalendarLtrRegular /></span><Text size={200}>Latest result</Text><Text className="stat-value">{latestResult?.date.split(',')[0] ?? '—'}</Text><Text size={100}>{latestResult ? `${latestResult.drawName}, 2026` : 'Most recent published draw'}</Text></Card>
        <Card className="stat-card" appearance="outline"><span className="stat-icon"><NumberSymbolRegular /></span><Text size={200}>Bonus numbers</Text><Text className="stat-value">{resource.status === 'data' ? bonusCount : '—'} <Text size={200}>of {resource.status === 'data' ? results.length : '—'} draws</Text></Text><Text size={100}>Shown separately in each result</Text></Card>
      </section>
      <section className="content-section">
        <SectionHeading title="Draw history" detail={latestResult ? `Updated ${latestResult.date}` : 'Recent sample outcomes'} icon={<HistoryRegular />} />
        <TabList selectedValue={tab} onTabSelect={(_, data) => setTab(String(data.value))} className="results-tabs">
          <Tab value="recent" icon={<TrophyRegular />}>Recent results</Tab>
          <Tab value="archive" icon={<CalendarLtrRegular />}>Archived draws</Tab>
        </TabList>
        {tab === 'recent' ? (
          <DataState
            resource={resource}
            retry={retry}
            isEmpty={(results) => results.length === 0}
            emptyTitle="No published results yet"
            emptyMessage="Published outcomes will appear here after a draw is complete."
            emptyAction={<Button appearance="primary" icon={<ArrowRightRegular />} as="a" href="/">Explore current draws</Button>}
          >
            {(results) => <ResultRows results={results} />}
          </DataState>
        ) : (
          <Card className="empty-card archive-empty" appearance="filled-alternative">
            <CalendarLtrRegular className="empty-icon" />
            <Title1>No archived draws yet</Title1>
            <Body1>Older published results will appear here when they become available. Your recent results remain ready to browse above.</Body1>
            <Button appearance="primary" icon={<ArrowRightRegular />} as="a" href="/">Browse current draws</Button>
          </Card>
        )}
      </section>
    </>
  );
}
