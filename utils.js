function ocrToUrlTitle(string) {
  const characters = '1234567890.,!/()$!@#%^&*+-= ';
  let urlString = '%';
  for (let i = 0; i < string.length; i++) {
    if (characters.includes(string[i])) {
      urlString += '%';
    } else {
      urlString += string[i];
    }
  }
  urlString = urlString.replace(/\n/g, '%');
  return urlString;
}

module.exports = { ocrToUrlTitle };
