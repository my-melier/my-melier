function ocrToUrlTitle(string) {
  const characters = '.,!/()$!@#%^&*+';
  return string
    .split('')
    .filter(char => !characters.includes(char))
    .join('')
    .replace(/-/g, ' ')
    .replace(/ /g, '_');
}

function urlToQueryString(string) {
  return string
    .split('_')
    .filter(word => word !== '')
    .join('%');
}

module.exports = { ocrToUrlTitle, urlToQueryString };
