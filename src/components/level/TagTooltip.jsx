import React from 'react';
import ReactTooltip from 'react-tooltip';
import tagDescription from '../../constants/tagDescription';

const TagTooltip = ({ tag, id }) => {
  return (
    <ReactTooltip id={id} place='bottom' type='dark' effect='solid'>
      <div style={{ fontWeight: 600 }}>
        {tagDescription[tag].tagName.toString()}
      </div>
      {tagDescription[tag].tagDescription.toString()}
    </ReactTooltip>
  );
};

export default TagTooltip;
