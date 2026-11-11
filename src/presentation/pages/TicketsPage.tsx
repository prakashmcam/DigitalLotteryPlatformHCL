import { useCallback } from 'react';
import {
  Badge, Body1, Button, Card, CardFooter, CardHeader, MessageBar,
  MessageBarBody, MessageBarTitle, Text, Title1, Title3,
} from '@fluentui/react-components';
import {
  ArrowRightRegular, InfoRegular, TicketDiagonalRegular,
} from '@fluentui/react-icons';
import { api } from '../../api';
import type { Ticket } from '../../domain/entities/Ticket';
import { DataState } from '../components/DataState';
import { NumberBalls } from '../components/NumberBalls';
import { SectionHeading } from '../components/SectionHeading';
import { useApiResource } from '../app/useApiResource';

function TicketCard({ ticket }: { readonly ticket: Ticket }) {
  const statusColor = ticket.status === 'Upcoming' ? 'warning' : ticket.status === 'Drawn' ? 'informative' : 'subtle';
  return (
    <Card className="ticket-card" appearance="outline">
      <CardHeader
        header={<div className="ticket-card__title"><Text className="ticket-code" size={100}>{ticket.id}</Text><Title3>{ticket.drawName}<Text className="ticket-date" size={200}> · {ticket.drawDate}</Text></Title3></div>}
        action={<Badge appearance="tint" color={statusColor}>{ticket.status}</Badge>}
      />
      <div className="ticket-card__numbers"><Text size={200} weight="semibold">Selected numbers</Text><NumberBalls label={`${ticket.id} selected numbers`} numbers={ticket.numbers} bonus={ticket.bonus} /></div>
      <CardFooter>
        <Text size={200} className="muted-copy">{ticket.status === 'Upcoming' ? 'Draw upcoming' : ticket.status === 'Drawn' ? 'Draw complete' : 'Result published'}</Text>
        <Button appearance="subtle" icon={<ArrowRightRegular />} iconPosition="after" as="a" href={ticket.status === 'Upcoming' ? `/draws/${ticket.drawId}` : '/results'}>View draw</Button>
      </CardFooter>
    </Card>
  );
}

export function TicketsPage() {
  const loadTickets = useCallback(() => api.listTickets(), []);
  const { resource, retry } = useApiResource(loadTickets);
  const ticketCount = resource.status === 'data' ? resource.data.length : null;

  return (
    <>
      <section className="mini-hero mini-hero--tickets">
        <div>
          <Text className="eyebrow eyebrow--light"><span className="eyebrow-dot" />Your sample wallet</Text>
          <Title1>My tickets</Title1>
          <Body1>A clear view of fictional ticket and draw details.</Body1>
        </div>
        <div className="mini-hero__action"><Badge appearance="tint" color="informative" icon={<TicketDiagonalRegular />}>{ticketCount === null ? 'Sample wallet' : `${ticketCount} sample tickets`}</Badge></div>
      </section>
      <MessageBar intent="info" className="demo-info">
        <InfoRegular />
        <MessageBarBody><MessageBarTitle>Local demo information</MessageBarTitle>The tickets below are fictional local examples, not records from an account.</MessageBarBody>
      </MessageBar>
      <section className="content-section" aria-labelledby="tickets-heading">
        <SectionHeading title="Ticket history" detail="Local examples only" icon={<TicketDiagonalRegular />} />
        <DataState
          resource={resource}
          retry={retry}
          isEmpty={(tickets) => tickets.length === 0}
          emptyTitle="Your sample wallet is empty"
          emptyMessage="Explore a draw to see how a number selection works in this non-transactional demo."
          emptyAction={<Button appearance="primary" icon={<ArrowRightRegular />} as="a" href="/">Explore active draws</Button>}
        >
          {(tickets) => <div className="ticket-list">{tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)}</div>}
        </DataState>
      </section>
    </>
  );
}
