const {createInterface} = require("node:readline");
const rl = createInterface({
  input : process.stdin,
  output : process.stdout
});

exports.tanya = (text, cb, param1, param2, param3)=>{
  rl.question(text, (jawaban)=>{
    cb(jawaban,param1,param2, param3);
  });
};

exports.tutup = () => {
  console.clear;
  console.log("Terima kasih telah berkunjung!");
  rl.close();
};
