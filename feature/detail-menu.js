
exports.detailMenu = (pilihan, noMenu,cb, cb1 )=>{
  //buat kembali ke function sebelumnya
  if (noMenu === 0) {
    cb();
    return;
  }
  // Mencari menu yang dipilih
  const menuDipilih = pilihan.find(item => item.id_menu === noMenu);
    
  //cek jika id menu tidak ditemukan maka kembali input pilih menunya
  if (!menuDipilih) {
    console.log("Menu tidak ditemukan! Silakan pilih nomor yang tersedia.");
    cb1();
    return;
  }
  // Menampilkan detail menu
  console.log(`-------------------------------------------------------------`);
  console.log(`-------------------DETAIL PESANAN----------------------------`);
  console.log(`Nama: ${menuDipilih.nama}`);
  console.log(`Harga: Rp ${menuDipilih.Harga.toLocaleString()}`);
  console.log(`Deskripsi: ${menuDipilih.Deskripsi}`);
  return menuDipilih;
};