const moment = require("moment");

const {createInterface} = require("node:readline");
const rl = createInterface({
  input : process.stdin,
  output : process.stdout
});

function convertTanggal(isiTgl){
  const tgl = moment(isiTgl, 'DD-MM-YYYY', true);
  if (!tgl.isValid()){
    console.log("Format Tanggal Salah");
    isiTanggal();
    return;
  }
  console.log(tgl.format('DD/MM/YYYY'));
  rl.close();
}


function isiTanggal(){
  rl.question("Inputkan tgl: ", (isiTgl) => {
    convertTanggal(isiTgl);
  });
} 
isiTanggal();
