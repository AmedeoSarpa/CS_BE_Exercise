const fs = require("fs");
const { parse } = require("csv-parse");

const printRow = (row) => {

  console.log(`${row.toString()};`);
};

const checkFileExistence = (filePath) => {
    try{
    fs.statSync(filePath)
    }
    catch{
        throw new Error('file not found')
    }

}

const mainFunction = () => {
  try {
    if (process.argv.length != 5) {
      throw new Error("Wrong parameters number");
    }
    const filePath = process.argv[2]
    const column = parseInt(process.argv[3]);
    if (isNaN(column)){
        throw new Error('Column value is not a number')
    }

    checkFileExistence(filePath)
    

    fs.createReadStream(filePath)
    .pipe(parse({ delimiter: [",", ";"], from_line: 1 }))
    .on("data",  (row) =>  {
        row.pop()
        if (row[column] == process.argv[4]){
         printRow(row);}
       });

  } catch (error) {
    console.log(error.message);
  }
};

mainFunction();
