const youtubeIdRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;

export const getYoutubeVideoId = (url: string) => youtubeIdRegex.exec(url)?.[1] ?? '';

export const getTimestamp = (url: string) => {
  const time = new URL(url).searchParams.get('t');

  if (!time) return null;

  return parseInt(time);
};
