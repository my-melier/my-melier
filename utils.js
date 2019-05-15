function ocrToUrlTitle(string) {
  const characters = '1234567890.,!/()$!@#%^&*+-= '
  let urlString = '%'
  for (let i = 0; i < string.length; i++) {
    if (characters.includes(string[i])) {
      urlString += '%'
    } else {
      urlString += string[i]
    }
  }
  urlString = urlString.replace(/\n/g, '%')
  return urlString
}

function numToLetter(num) {
  let letterGrade

  if (num <= 84) {
    letterGrade = 'C'
  } else if (num > 84 && num <= 88) {
    letterGrade = 'B-'
  } else if (num > 88 && num <= 92) {
    letterGrade = 'B'
  } else if (num > 92 && num <= 96) {
    letterGrade = 'A-'
  } else {
    letterGrade = 'A'
  }
  return letterGrade
}

module.exports = {ocrToUrlTitle, numToLetter}
