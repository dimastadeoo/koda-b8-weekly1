const {createInterface} = require("node:readline");
const rl = createInterface({
  input : process.stdin,
  output : process.stdout
});

exports.tanya = (text)=>{
  return new Promise((resolve)=>{
    rl.question(text, (jawaban)=>{
      resolve(jawaban);
    });
  });
};

exports.tutup = () => {
  console.clear;
  console.log("Terima kasih telah berkunjung!");
  rl.close();
};
