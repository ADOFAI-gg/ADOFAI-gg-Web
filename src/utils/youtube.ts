const youtubeIdRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;

export const getYoutubeVideoId = (url: string) => youtubeIdRegex.exec(url)?.[1] ?? '';
