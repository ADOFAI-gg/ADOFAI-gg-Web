import React from 'react';
import tagDescription from '../../constants/tagDescription';

// Components
import TagTooltip from './TagTooltip';

const idConvert = (id) => {
  id = id.toString();
  while (id.length < 6) id = '0' + id;
  return id;
};

const LevelTags = ({ tag, id, styleClass }) => {
  if (tagDescription[tag] === undefined) return;

  return (
    <>
      <img
        data-tip
        data-for={'tag_' + tag + '_' + idConvert(id)}
        className={styleClass}
        src={'/tag/' + tag + '.svg'}
        alt=''
      />
      <TagTooltip tag={tag} id={'tag_' + tag + '_' + idConvert(id)} />
    </>
  );
};

export default LevelTags;
