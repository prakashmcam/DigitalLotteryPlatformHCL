import { Badge, Text } from '@fluentui/react-components';

interface NumberBallsProps {
  readonly numbers: readonly number[];
  readonly bonus?: number | null;
  readonly label?: string;
  readonly selectable?: boolean;
  readonly selectedNumbers?: readonly number[];
  readonly selectedBonus?: number | null;
  readonly onSelect?: (number: number) => void;
  readonly onSelectBonus?: (number: number) => void;
  readonly bonusMax?: number | null;
}

function twoDigits(value: number): string {
  return value.toString().padStart(2, '0');
}

export function NumberBalls({
  numbers,
  bonus,
  label,
  selectable = false,
  selectedNumbers = [],
  selectedBonus = null,
  onSelect,
  onSelectBonus,
  bonusMax,
}: NumberBallsProps) {
  return (
    <div className="ball-group" aria-label={label}>
      {numbers.map((number) => {
        const isSelected = selectedNumbers.includes(number);
        return selectable ? (
          <button
            aria-pressed={isSelected}
            className={`number-ball ${isSelected ? 'is-selected' : ''}`}
            key={number}
            onClick={() => onSelect?.(number)}
            type="button"
          >{twoDigits(number)}</button>
        ) : <span className="number-ball" key={number}>{twoDigits(number)}</span>;
      })}
      {bonus !== undefined && bonus !== null && (
        <span className="number-ball is-bonus">{twoDigits(bonus)}</span>
      )}
      {selectable && bonusMax !== null && bonusMax !== undefined && (
        <div className="bonus-select">
          <Text className="bonus-label" size={200} weight="semibold">Bonus</Text>
          <div className="ball-group ball-group--bonus" aria-label="Choose a bonus number">
            {Array.from({ length: bonusMax }, (_, index) => index + 1).map((number) => (
              <button
                aria-pressed={selectedBonus === number}
                className={`number-ball number-ball--small ${selectedBonus === number ? 'is-bonus-selected' : ''}`}
                key={number}
                onClick={() => onSelectBonus?.(number)}
                type="button"
              >{twoDigits(number)}</button>
            ))}
          </div>
          {selectedBonus !== null && <Badge appearance="tint" color="warning">Bonus {twoDigits(selectedBonus)}</Badge>}
        </div>
      )}
    </div>
  );
}
