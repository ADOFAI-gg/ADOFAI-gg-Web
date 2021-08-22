import ReactTooltip from 'react-tooltip';

const tagDescription = [
  {
    tagName: 'Tag Name 1',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 2',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 3',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 4',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 5',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 6',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 7',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 8',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 9',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 10',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 11',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 12',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 13',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 14',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 15',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 16',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 17',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 18',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 19',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 20',
    tagDescription: 'This tag means that this level is like this and that.'
  },
  {
    tagName: 'Tag Name 21',
    tagDescription: 'This tag means that this level is like this and that.'
  }
]

function idConvert(id) {
	id = id.toString();
	while(id.length < 6) id = "0" + id;
	return id;
}

const LevelTags2 = ({ tag, id, styleClass }) => {
  return (
		<>
			<img data-tip data-for={'tag_' + tag + '_' + idConvert(id)} className={styleClass} src={'tag/' + tag + '.svg'} alt="" />
    	<ReactTooltip id={'tag_' + tag + '_' + idConvert(id)} place='bottom' type='dark' effect='solid'>
      	<span style={{ whiteSpace: 'pre-line' }}>
        	{tagDescription[tag - 1].tagName.toString() + '\n' + tagDescription[tag - 1].tagDescription.toString()}
      	</span>
    	</ReactTooltip>
		</>
  );
};
  
export default LevelTags2;