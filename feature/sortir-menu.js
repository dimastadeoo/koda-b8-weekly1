/**
 * @typedef {object} ListMenu  
 * @property {number} id_menu the uniq identifier for the menu
 * @property {string} nama the name of menu
 * @property {number} Harga price of menu
 * @property {string} Deskripsi the deskriptions of menu
 * @property {string} Kategori Kategori of Menu
 */
/**
 * filter menu list by category
 * @param {ListMenu[]} menu An array of menu object
 * @param {number} katMenu must be number of input user choice
 * @param {function} cb The callback function to run after processing
 * @returns {ListMenu[]} An array list menu based on the selected category.. 
 */

exports.sortirMenu =(katMenu, menu, cb)=>{
  //sortir menu berdaasarkan kategori
  let sortMenu;
  switch (katMenu){
  case 1:
    sortMenu = menu.filter(item => item.Kategori === "paket");
    console.log("-------------------MENU PAKET--------------------------------");
    break;
  case 2:
    sortMenu = menu.filter(item => item.Kategori === "makanan");
    console.log("-------------------MENU MAKANAN-------------------------------");
    break;
  case 3:
    sortMenu = menu.filter(item => item.Kategori === "minuman");
    console.log("-------------------MENU MINUMAN-------------------------------");
    break;
  case 4:
    return cb();
    //pilihan jika tidak sesuai input yang diinginkan
  default:
    console.error("ketikkan hanya nomor 1-5"); 
    return false;
  }
  //tampilin daftar menu berdasarkan kategori
  let x = 0;
  while (x < sortMenu.length ){
    console.log(`No. ${sortMenu[x].id_menu} ${sortMenu[x].nama} - ${sortMenu[x].Harga.toLocaleString()}`);
    x++;
  }
  console.log("-------------------------------------------------------------");
  return (sortMenu);
};


