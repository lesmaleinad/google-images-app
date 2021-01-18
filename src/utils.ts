export const utils = {
    normalizeUrl: (url: string): string => {
    return url.slice(0, url.indexOf('/', 8));
    }
}