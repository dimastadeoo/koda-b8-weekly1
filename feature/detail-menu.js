/**
 * @typedef {object} ListMenu  
 * @property {number} id_menu the uniq identifier for the menu
 * @property {string} nama the name of menu
 * @property {number} Harga price of menu
 * @property {string} Deskripsi the deskriptions of menu
 * @property {string} Kategori Kategori of Menu
 */
/**
 * to show data deskription of menu will user choice
 * @param {ListMenu[]} pilihan An array of sortir menu of kategori
 * @param {number} noMenu must be number of input user choice
 * @param {function} cb The callback function to run after processing
 * @returns {ListMenu} an object in the form of descriptive data for the selected menu.. 
 */

exports.detailMenu = (pilihan, noMenu, cb )=>{
  //buat kembali ke function sebelumnya
  if (noMenu === 0) {
    
    return cb();
  }
  // Mencari menu yang dipilih
  const menuDipilih = pilihan.find(item => item.id_menu === noMenu);
    
  //cek jika id menu tidak ditemukan maka kembali input pilih menunya
  if (!menuDipilih) {
    console.error("Menu tidak ditemukan! Silakan pilih nomor yang tersedia.");
    return false;
  }
  // Menampilkan detail menu
  console.log(`-------------------------------------------------------------`);
  console.log(`-------------------DETAIL PESANAN----------------------------`);
  console.log(`Nama: ${menuDipilih.nama}`);
  console.log(`Harga: Rp ${menuDipilih.Harga.toLocaleString()}`);
  console.log(`Deskripsi: ${menuDipilih.Deskripsi}`);
  return menuDipilih;
};