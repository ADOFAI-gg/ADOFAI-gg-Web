const tagDescription = [
  {
    id: 0,
    tagName: 'Tag Name 0',
    tagDescription: 'This tag means that this level is like this and that 0.'
  },
  {
    id: 1,
    tagName: 'Tag Name 1',
    tagDescription: 'This tag means that this level is like this and that 1.'
  },
  {
    id: 2,
    tagName: 'Tag Name 2',
    tagDescription: 'This tag means that this level is like this and that 2.'
  },
  {
    id: 3,
    tagName: 'Tag Name 3',
    tagDescription: 'This tag means that this level is like this and that 3.'
  },
  {
    id: 4,
    tagName: 'Tag Name 4',
    tagDescription: 'This tag means that this level is like this and that 4.'
  },
  {
    id: 5,
    tagName: 'Tag Name 5',
    tagDescription: 'This tag means that this level is like this and that 5.'
  },
  {
    id: 6,
    tagName: 'Tag Name 6',
    tagDescription: 'This tag means that this level is like this and that 6.'
  },
  {
    id: 7,
    tagName: 'Tag Name 7',
    tagDescription: 'This tag means that this level is like this and that 7.'
  },
  {
    id: 8,
    tagName: 'Tag Name 8',
    tagDescription: 'This tag means that this level is like this and that 8.'
  },
  {
    id: 9,
    tagName: 'Tag Name 9',
    tagDescription: 'This tag means that this level is like this and that 9.'
  }
]

const LevelTags = ({ tag }) => {
  return (
    <div key={tag} className="tooltip-container">
      <span className="tooltiptext">
        {tagDescription[tag].tagName}
        <br /><br />
        <span style={{ fontWeight:'500' }}>{tagDescription[tag].tagDescription}</span>
      </span>
      <img className='tag' src={`http://localhost:3000/tag_icons/${tag}.svg`} alt="" />
    </div>
  )
}

export default LevelTags