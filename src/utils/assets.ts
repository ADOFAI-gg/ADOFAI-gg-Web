export const svgIcons = import.meta.glob('../assets/{icons,tagIcons}/*.svg', {
  eager: true,
  as: 'raw'
});
