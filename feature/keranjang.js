exports.lihatKeranjang = (pesanan, cb) =>{
  //Cek jika Pesanan masih kosong
  let totalHarga = 0;
  if (pesanan.length === 0) {
    console.clear();
    console.log("KERANJANG KOSONG SILAHKAN PESAN DULU");
    return cb();
  }

  //Data Keranjang Belanja yang ditampung di array pesanan
  console.log(`-------------------------------------------------------------`);
  console.log(`----------------KERANJANG BELANJA----------------------------`);
  //inisiasi looping
  let y=0;
  while (y < pesanan.length){
    console.log(`${y + 1}. ${pesanan[y].nama}`);
    console.log(`${pesanan[y].jumlah}x @ Rp ${pesanan[y].harga.toLocaleString()}`);
    console.log(`Subtotal: Rp ${pesanan[y].subtotal.toLocaleString()}`);
    totalHarga += pesanan[y].subtotal;
    y++;
  }
  console.log(`-------------------------------------------------------------`);
  console.log(`TOTAL HARGA: Rp ${totalHarga.toLocaleString()}`);
  console.log(`-------------------------------------------------------------`);
  return totalHarga;
};