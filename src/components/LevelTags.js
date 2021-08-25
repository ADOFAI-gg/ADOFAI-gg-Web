const tagDescription = [
  {
    id: 0,
    tagName: "Tag Name 0",
    tagDescription: "This tag means that this level is like this and that 0.",
  },
  {
    id: 1,
    tagName: "Tag Name 1",
    tagDescription: "This tag means that this level is like this and that 1.",
  },
  {
    id: 2,
    tagName: "Tag Name 2",
    tagDescription: "This tag means that this level is like this and that 2.",
  },
  {
    id: 3,
    tagName: "Tag Name 3",
    tagDescription: "This tag means that this level is like this and that 3.",
  },
  {
    id: 4,
    tagName: "Tag Name 4",
    tagDescription: "This tag means that this level is like this and that 4.",
  },
  {
    id: 5,
    tagName: "Tag Name 5",
    tagDescription: "This tag means that this level is like this and that 5.",
  },
  {
    id: 6,
    tagName: "Tag Name 6",
    tagDescription: "This tag means that this level is like this and that 6.",
  },
  {
    id: 7,
    tagName: "Tag Name 7",
    tagDescription: "This tag means that this level is like this and that 7.",
  },
  {
    id: 8,
    tagName: "Tag Name 8",
    tagDescription: "This tag means that this level is like this and that 8.",
  },
  {
    id: 9,
    tagName: "Tag Name 9",
    tagDescription: "This tag means that this level is like this and that 9.",
  },
  {
    id: 10,
    tagName: "Tag Name 10",
    tagDescription: "This tag means that this level is like this and that 10.",
  },
  {
    id: 11,
    tagName: "Tag Name 11",
    tagDescription: "This tag means that this level is like this and that 11.",
  },
  {
    id: 12,
    tagName: "Tag Name 12",
    tagDescription: "This tag means that this level is like this and that 12.",
  },
  {
    id: 13,
    tagName: "Tag Name 13",
    tagDescription: "This tag means that this level is like this and that 13.",
  },
  {
    id: 14,
    tagName: "Tag Name 14",
    tagDescription: "This tag means that this level is like this and that 14.",
  },
  {
    id: 15,
    tagName: "Tag Name 15",
    tagDescription: "This tag means that this level is like this and that 15.",
  },
  {
    id: 16,
    tagName: "Tag Name 16",
    tagDescription: "This tag means that this level is like this and that 16.",
  },
  {
    id: 17,
    tagName: "Tag Name 17",
    tagDescription: "This tag means that this level is like this and that 17.",
  },
  {
    id: 18,
    tagName: "Tag Name 18",
    tagDescription: "This tag means that this level is like this and that 18.",
  },
  {
    id: 19,
    tagName: "Tag Name 19",
    tagDescription: "This tag means that this level is like this and that 19.",
  },
  {
    id: 20,
    tagName: "Tag Name 20",
    tagDescription: "This tag means that this level is like this and that 20.",
  },
  {
    id: 21,
    tagName: "Tag Name 21",
    tagDescription: "This tag means that this level is like this and that 21.",
  },
];

const LevelTags = ({ tag, styleClass }) => {
  return (
    <div key={tag} className="tooltip-container">
      <span className="tooltiptext">
        {tagDescription[tag].tagName}
        <br />
        <br />
        <span style={{ fontWeight: "500" }}>
          {tagDescription[tag].tagDescription}
        </span>
      </span>
      <img className={styleClass} src={`/tag_icons/${tag}.svg`} alt="" />
    </div>
  );
};

export default LevelTags;
