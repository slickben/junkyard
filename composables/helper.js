export const useTruncates = (length, body) => {
  if (!body) return "";
  body = body.toString();
  if (body.length > length) {
    return body.substring(0, length) + "...";
  } else {
    return body;
  }
};

export const abbreviateNumber = (number) => {
  let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  // what tier? (determines SI symbol)
  let tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return `${number}`;

  // get suffix and determine scale
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);

  // scale the number
  let scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(0) + suffix;
};


export const arrayToCsv = (data) => {
  const array = [Object.keys(data[0])].concat(data)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}
export const downloadBlob = (content, filename, contentType) => {
  // Create a blob
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)

  // Create a link to download it
  const pom = document.createElement('a')

  pom.href = url
  pom.setAttribute('download', filename)
  pom.click()
}
