import React, { useContext } from 'react';
import cn from 'classnames';
import { Person as PersonType } from '../../types';
import { PersonLink } from '../PersonLink';
import { PeopleContext } from '../../contexts';

interface PersonProps {
  person: PersonType;
  selectedPersonSlug: string | null;
}

export const Person: React.FC<PersonProps> = ({
  person,
  selectedPersonSlug,
}) => {
  const context = useContext(PeopleContext);

  if (context === undefined) {
    throw new Error('Person component must be used within a PeopleProvider');
  }

  const peopleLookup = context.peopleLookup;

  const motherPersonInLookup = person.motherName
    ? peopleLookup.get(person.motherName)
    : undefined;

  const fatherPersonInLookup = person.fatherName
    ? peopleLookup.get(person.fatherName)
    : undefined;

  const isSelected = selectedPersonSlug === person.slug;

  return (
    <>
      <tr
        data-cy="person"
        className={cn({
          'has-background-warning': isSelected,
        })}
      >
        <td>
          <PersonLink
            to={`/people/${person.slug}`}
            displayText={person.name}
            isFemale={person.sex === 'f'}
          />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>

        <td>
          {person.motherName ? (
            motherPersonInLookup ? (
              <PersonLink
                to={`/people/${motherPersonInLookup.slug}`}
                displayText={motherPersonInLookup.name}
                isFemale={motherPersonInLookup.sex === 'f'}
              />
            ) : (
              <span>{person.motherName}</span>
            )
          ) : (
            '-'
          )}
        </td>

        <td>
          {person.fatherName ? (
            fatherPersonInLookup ? (
              <PersonLink
                to={`/people/${fatherPersonInLookup.slug}`}
                displayText={fatherPersonInLookup.name}
                isFemale={false}
              />
            ) : (
              <span>{person.fatherName}</span>
            )
          ) : (
            '-'
          )}
        </td>
      </tr>
    </>
  );
};
