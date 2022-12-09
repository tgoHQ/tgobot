//jshint esversion:10
const fs = require('fs');

function readAll(file) { //returns whole file as json
  let json;

  //make path
  const path = `.../storage/${file}.json`;

  //read file
  const data = fs.readFileSync(path, function (err) {
    if (err) throw err;
  });

  try { //return parsed json
    json = JSON.parse(data);
  }
  catch { //if file is blank or malformatted, return empty obj
    json = {};
  }
  return json;
}

function read(file, key) { //returns value of a key from a file
  return readAll(file)[key];
}
function write(file, key, value) { //sets the value of a key in a file

  //read file
  const json = readAll(file);

  //update key to new value
  json[key] = value;

  //write updated file
  fs.writeFileSync(file, JSON.stringify(json), function (err) {
    if (err) throw err;
  });
}

module.exports = {
  read, write
};
