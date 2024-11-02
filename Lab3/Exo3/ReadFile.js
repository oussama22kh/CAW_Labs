import fs from 'fs';
let arg = process.argv
try {
    console.log(fs.readFileSync(arg[2],"utf-8"));
} catch (error) {
    console.log("file not found")
}


