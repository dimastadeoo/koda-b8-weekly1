exports.pushPsnBaru = (menuDipilih, jumlah)=>{
  console.log(`-------------------------------------------------------------`);    
  if (isNaN(jumlah) || jumlah < 1) {
    console.log("jumlah pesanan minimal 1 / inputan bukan number");
    return false; 
  }
  // Menambahkan ke keranjang
  const pesananBaru = {
    nama: menuDipilih.nama,
    harga: menuDipilih.Harga,
    jumlah: jumlah,
    subtotal: menuDipilih.Harga * jumlah
  };
  // masukkan data pesananBaru ke array pesanan


  console.log(`Berhasil menambahkan ${menuDipilih.nama} sebanyak ${jumlah}x ke keranjang!`);
  console.log(`Subtotal: Rp ${pesananBaru.subtotal.toLocaleString()}`);
  console.log(`-------------------------------------------------------------`);
  return pesananBaru;
};