//menggunakan library eksternal dayjs untuk menampilkan waktu
const dayjs = require('dayjs');
require('dayjs/locale/id'); 
//untuk membuat format waktu indonesia
dayjs.locale('id');
const date = dayjs().format('dddd, DD MMMM YYYY HH:mm:ss');

exports.cekout = (totalBayar, bayar, pesanan) =>{
  //proses guarding jika pembayaran kurang atau input     
  if (isNaN(bayar) || bayar < totalBayar || bayar === null) {
    console.error("Uang yang dibayarkan kurang! / inputan bukan number");
    return false;
  }
  console.clear;
  const kembalian = bayar - totalBayar;
  console.log(`-----------------------STRUK PEMBAYARAN----------------------`);
  console.log(`                       Popeye Chicken`);
  console.log(`-------------------------------------------------------------`);
  //inisiasi looping
  let x = 0;
  while (x < pesanan.length){
    console.log(`# ${pesanan[x].nama}`);
    console.log(`${pesanan[x].jumlah}x @ Rp ${pesanan[x].harga.toLocaleString()} = Rp ${pesanan[x].subtotal.toLocaleString()}`);
    x++;
  }     
  console.log(`-------------------------------------------------------------`);
  console.log(`Total    : Rp ${totalBayar.toLocaleString()}`);
  console.log(`Bayar    : Rp ${bayar.toLocaleString()}`);
  console.log(`Kembali  : Rp ${kembalian.toLocaleString()}`);
  console.log("Waktu Transaksi: ", date + " WIB");
  console.log(`-------------------------------------------------------------`);
  console.log("Terima kasih atas pesanan Anda!");
  console.log(`-------------------------------------------------------------`);

};

