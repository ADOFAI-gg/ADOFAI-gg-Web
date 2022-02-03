import { Link } from 'react-router-dom';

const SectionTitle = ({ showMoreUrl, children, style }) => {
  return (
    <div className='section-title' style={style}>
      <h1>{children}</h1>

      {showMoreUrl ? (
        <p className='section-title-show-more'>
          <Link to={showMoreUrl}>Show More</Link>
        </p>
      ) : null}
    </div>
  );
};

export default SectionTitle;
