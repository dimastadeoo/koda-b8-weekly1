const {createInterface} = require("node:readline");
const rl = createInterface({
  input : process.stdin,
  output : process.stdout
});

exports.input = (text, cb, param1, param2)=>{
  rl.question(text, (jawaban)=>{
    cb(jawaban,param1,param2);
  });
};
