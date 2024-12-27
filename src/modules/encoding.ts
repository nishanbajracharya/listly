export function encode(text: string) {
  return btoa(encodeURI(text));
}

export function decode(text: string) {
  return decodeURI(atob(text));
}
