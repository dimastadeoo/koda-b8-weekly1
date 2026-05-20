
exports.inputPesan = ()=>{
  console.log("-------------------Selamat Datang Di Popeye------------------");
  console.log(`Silahkan pilih ingin pesan Apa
                1. Paket Makan 
                2. Makanan
                3. Minuman
                4. Lihat Keranjang & Cekout
                5. Keluar `);
  console.log(`-------------------------------------------------------------`);

};

exports.sortirMenu =(katMenu,menu, cb, cb1, cb2, pesanan)=>{
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
    cb(pesanan);
    return;
  case 5:
    cb1();
    return;
    //pilihan jika tidak sesuai input yang diinginkan
  default:
    console.log("ketikkan hanya nomor 1-5");
    cb2();
    return;
        
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