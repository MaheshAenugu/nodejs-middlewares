const fs = require("fs");

//create folder

const createFolder = (folderName) => {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
};

const defaultPosts =
  '[{"id":"2023","title":"HTML","url":"http://someurl.com","description":"The best"}]';

// create file

const createFile = (file, content) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, defaultPosts);
  }
};

module.exports = {
  createFolder,
  createFile,
};
