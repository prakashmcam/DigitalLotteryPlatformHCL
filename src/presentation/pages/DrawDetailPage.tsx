import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Badge, Body1, Button, Card, CardHeader, Field, MessageBar, MessageBarBody,
  MessageBarTitle, Text, Title1, Title3,
} from '@fluentui/react-components';
import {
  ArrowLeftRegular, CheckmarkCircleRegular, ClockRegular, InfoRegular,
  SparkleRegular, TicketDiagonalRegular, TrophyRegular,
} from '@fluentui/react-icons';
import { api } from '../../api';
import type { Draw } from '../../domain/entities/Draw';
import type { DemoSelection } from '../../domain/entities/Ticket';
import { drawId } from '../../domain/value-objects/DrawId';
import { formatMoney, money } from '../../domain/value-objects/Money';
import { DataState } from '../components/DataState';
import { NumberBalls } from '../components/NumberBalls';
import { SectionHeading } from '../components/SectionHeading';
import { useApiResource } from '../app/useApiResource';

function SelectionForm({ draw }: { readonly draw: Draw }) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [preview, setPreview] = useState<DemoSelection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const selectionReady = numbers.length === draw.rules.mainCount && (draw.rules.bonusMax === null || bonus !== null);

  function toggleNumber(number: number) {
    setError(null);
    setPreview(null);
    setNumbers((current) => current.includes(number)
      ? current.filter((value) => value !== number)
      : current.length < draw.rules.mainCount ? [...current, number] : current);
  }

  const reviewSelection = async () => {
    setError(null);
    setPreview(null);
    try {
      const result = await api.previewSelection({ drawId: draw.id, numbers, bonus });
      if (!result) setError('No selection preview is available in the empty demo state.');
      else setPreview(result);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'The selection could not be reviewed.');
    }
  };

  return (
    <Card className="selection-card" appearance="outline">
      <CardHeader
        image={<span className="section-heading__icon"><TicketDiagonalRegular /></span>}
        header={<div><Title3>Choose your numbers</Title3><Text size={200}>Pick {draw.rules.mainCount} main numbers{draw.rules.bonusMax ? ` and 1 bonus number` : ''}.</Text></div>}
        action={<Badge appearance="tint" color="informative">{numbers.length} / {draw.rules.mainCount} selected</Badge>}
      />
      <Field
        className="demo-validation-field"
        validationState="warning"
        validationMessage="Demo only — selecting numbers does not purchase, reserve, or submit a ticket."
      >
        <div className="number-picker" role="group" aria-label={`Choose ${draw.rules.mainCount} main numbers from 1 to ${draw.rules.mainMax}`}>
          {Array.from({ length: draw.rules.mainMax }, (_, index) => index + 1).map((number) => {
            const selected = numbers.includes(number);
            return (
              <button
                aria-pressed={selected}
                className={`number-pick ${selected ? 'number-pick--selected' : ''}`}
                disabled={!selected && numbers.length >= draw.rules.mainCount}
                key={number}
                onClick={() => toggleNumber(number)}
                type="button"
              >{number.toString().padStart(2, '0')}</button>
            );
          })}
        </div>
      </Field>
      {draw.rules.bonusMax !== null && (
        <div className="bonus-picker">
          <Text className="form-label" weight="semibold">Bonus number · choose 1–{draw.rules.bonusMax}</Text>
          <NumberBalls
            bonusMax={draw.rules.bonusMax}
            numbers={[]}
            onSelectBonus={(value) => { setBonus(value); setError(null); setPreview(null); }}
            selectedBonus={bonus}
            selectable
          />
        </div>
      )}
      <div className="selection-summary">
        <div><Text size={200}>Demo ticket price</Text><Text className="selection-summary__price">{formatMoney(money(draw.ticketPriceCents))}</Text></div>
        <div className="selection-summary__numbers">
          <Text size={200} weight="semibold">Your selection</Text>
          {numbers.length > 0 ? <NumberBalls numbers={numbers} bonus={bonus} label="Selected demo numbers" /> : <Text className="muted-copy" size={200}>Choose your numbers above</Text>}
        </div>
      </div>
      {error && <MessageBar intent="error"><MessageBarBody><MessageBarTitle>Selection not ready</MessageBarTitle>{error}</MessageBarBody></MessageBar>}
      {preview && <MessageBar intent="success"><CheckmarkCircleRegular /><MessageBarBody><MessageBarTitle>Demo selection reviewed</MessageBarTitle>{preview.notice}</MessageBarBody></MessageBar>}
      <div className="selection-actions">
        <Button appearance="secondary" onClick={() => { setNumbers([]); setBonus(null); setPreview(null); setError(null); }}>Clear selection</Button>
        <Button appearance="primary" disabled={!selectionReady} icon={<CheckmarkCircleRegular />} onClick={reviewSelection}>Review demo selection</Button>
      </div>
    </Card>
  );
}

export function DrawDetailPage() {
  const { drawId: rawDrawId = '' } = useParams();
  const loadDraw = useCallback(() => api.getDraw(drawId(rawDrawId)), [rawDrawId]);
  const { resource, retry } = useApiResource(loadDraw);

  return (
    <DataState
      resource={resource}
      retry={retry}
      isEmpty={(draw) => draw === null}
      emptyTitle="We couldn’t find that draw"
      emptyMessage="Choose one of the active draws to see its number ranges and demo selection."
      emptyAction={<Button appearance="primary" icon={<ArrowLeftRegular />} as="a" href="/">Browse active draws</Button>}
    >
      {(draw) => draw ? <DrawDetailContent draw={draw} /> : null}
    </DataState>
  );
}

function DrawDetailContent({ draw }: { readonly draw: Draw }) {
  return (
    <>
      <section className="detail-heading">
        <div>
          <Text className="eyebrow"><span className="eyebrow-dot" />Draw details</Text>
          <Title1>{draw.name}</Title1>
          <Body1>{draw.summary} · {draw.schedule}</Body1>
        </div>
        <Badge appearance="tint" color={draw.closesIn ? 'warning' : 'success'} icon={draw.closesIn ? <ClockRegular /> : <CheckmarkCircleRegular />}>
          {draw.closesIn ? `Closes in ${draw.closesIn}` : 'Open'}
        </Badge>
      </section>
      <div className="detail-layout">
        <section className="detail-overview" aria-label={`${draw.name} information`}>
          <Card className="detail-jackpot" appearance="filled-alternative">
            <span className="detail-jackpot__icon"><TrophyRegular /></span>
            <Text size={200}>Current jackpot</Text>
            <Text className="detail-jackpot__amount">{draw.jackpot}</Text>
            <Text className="muted-copy">A sample prize value for this fictional draw.</Text>
          </Card>
          <Card className="detail-rules" appearance="outline">
            <SectionHeading title="Draw at a glance" detail="Number selection rules" icon={<SparkleRegular />} />
            <dl className="rules-list">
              <div><dt>Main numbers</dt><dd>{draw.rules.mainCount} of {draw.rules.mainMax}</dd></div>
              <div><dt>Bonus number</dt><dd>{draw.rules.bonusMax ? `1 of ${draw.rules.bonusMax}` : 'None'}</dd></div>
              <div><dt>Demo ticket price</dt><dd>{formatMoney(money(draw.ticketPriceCents))}</dd></div>
              <div><dt>Draw time</dt><dd>{draw.schedule}</dd></div>
            </dl>
          </Card>
          <MessageBar intent="info" className="non-transactional-note">
            <InfoRegular />
            <MessageBarBody><MessageBarTitle>For demonstration only</MessageBarTitle>This interactive selection stays temporary. It does not create an entry, accept payment, or reserve numbers.</MessageBarBody>
          </MessageBar>
        </section>
        <section className="detail-selection" aria-label="Number selection form">
          <SelectionForm draw={draw} />
        </section>
      </div>
    </>
  );
}
