import React from 'react';
import { Link } from 'react-router-dom';

const SectionTitle = ({ showMoreUrl, children, style }) => {
  return (
    <div className='section-title' style={style}>
      <h1>{children}</h1>

      {showMoreUrl ? (
        <Link to={showMoreUrl} className='section-title-show-more'>
          Show More
        </Link>
      ) : null}
    </div>
  );
};

export default SectionTitle;
