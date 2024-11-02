const fs = require("fs");

const fileName = process.argv[2];
const text = process.argv[3];

if (!fileName || !text) {
  console.log("Please provide both a filename and text as parameters.");
  process.exit(1);
}

fs.writeFile(fileName, text, (err) => {
  if (err) {
    console.error("An error occurred while writing to the file:", err);
    return;
  }
  console.log("The file has been saved!");

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("An error occurred while reading the file:", err);
      return;
    }
    console.log("File contents:");
    console.log(data);
  });
});
