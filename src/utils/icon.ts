export const getIconClass = (name: string, namespace: string) => `icon-${namespace}__${name}`;

export const generateIconStyles = () => {
  const prefix = '../assets/';
  const icons = import.meta.glob('../assets/{icons,tagIcons}/*.svg', {
    eager: true,
    as: 'url'
  });
  const css: string[] = [];
  for (const key in icons) {
    const [namespace, name] = key.slice(prefix.length, key.length - 4).split('/');
    const url = icons[key];
    const element = `.${getIconClass(name, namespace)} { --icon-url: url('${url.replace(
      /'/g,
      '%27'
    )}') }`;

    css.push(element);
  }

  return `<style>\n${css.join('\n')}\n</style>`;
};
