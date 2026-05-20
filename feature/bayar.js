
exports.cekout = (totalBayar, bayar, pesanan) =>{
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
  console.log(`-------------------------------------------------------------`);
  console.log("Terima kasih atas pesanan Anda!");
  console.log(`-------------------------------------------------------------`);
  // Reset keranjang setelah checkout
  // pesanan = [];  
  // input(tanyaPesan, inputTanya, tutupPesanan);
};

