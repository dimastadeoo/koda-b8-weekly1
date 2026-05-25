/**
 * @typedef {object} MenuSelected  
 * @property {number} id_menu the uniq identifier for the menu
 * @property {string} nama the name of menu
 * @property {number} Harga price of menu
 * @property {string} Deskripsi the deskriptions of menu
 * @property {string} Kategori Kategori of Menu
 */
/**
 * @typedef {object} cart  
 * @property {string} nama the name of menu
 * @property {number} harga price of menu
 * @property {number} jumlah quantity of user input
 * @property {number} subtotal quantity * price
 */
/**
 * input the order quantity process and set order in cart
 * @param {MenuSelected} menuDipilih an object in the form of descriptive data for the selected menu
 * @param {number} jumlah must be number of input order quality
 * @returns {cart} an object in the form of data menu, qty, and sub-total to be put into the cart 
 */

exports.pushPsnBaru = (menuDipilih, jumlah)=>{
  console.log(`-------------------------------------------------------------`);    
  if (isNaN(jumlah) || jumlah < 1 || jumlah === null) {
    console.error("jumlah pesanan minimal 1 / inputan bukan number");
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