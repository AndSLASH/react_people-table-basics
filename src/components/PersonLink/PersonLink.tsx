import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

interface PersonLinkProps {
  to: string;
  displayText: string;
  isFemale?: boolean;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  to,
  displayText,
  isFemale,
}) => {
  const linkClasses = cn({ 'has-text-danger': isFemale });

  return (
    <Link to={to} className={linkClasses}>
      {displayText}
    </Link>
  );
};
