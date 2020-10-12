const fsPromises = require ('fs').promises

module.exports = (pathUrl) => {
  return fsPromises.readFile(pathUrl, {encoding: 'utf8'})
    .then (file => {
      return JSON.parse(file)
    })
}