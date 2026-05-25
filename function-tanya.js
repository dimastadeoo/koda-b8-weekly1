const {createInterface} = require("node:readline");
const rl = createInterface({
  input : process.stdin,
  output : process.stdout
});
/**
 * input Data
 * @param {string} text a text in the form of a data input title
 * @returns {string} returns a value from input data in the form of a string
 */
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
