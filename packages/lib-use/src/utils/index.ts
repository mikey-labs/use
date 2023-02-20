export const inBrowser =  typeof window !== 'undefined' && 'onload' in window
export const isSupportFetch = inBrowser && typeof window['fetch'] === 'function'
