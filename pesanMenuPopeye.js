const menu = require("./menu.json");

const tutupPesanan = () => {
  console.clear;
  console.log("Terima kasih telah berkunjung!");
  rl.close();
};

let pesanan =[];

const tanyaPesan = "Ingin memesan menu lain? (y/n): ";
const tanyaJml = "Masukkan jumlah pesanan: ";
const tanyaMenu = "Masukkan nomor menu / atau ketik 0 untuk kembali): ";
const tanyaHapus = "Jika ingin hapus, Ketik Nomor Pesanan / ketik n jika sudah beres: ";

const {createInterface} = require("node:readline");
const rl = createInterface({
  input : process.stdin,
  output : process.stdout
});

function sortirMenu(katMenu){
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
    lihatKeranjang();
    return;
  case 5:
    tutupPesanan();
    return;
    //pilihan jika tidak sesuai input yang diinginkan
  default:
    console.log("ketikkan hanya nomor 1-5");
    inputPesan();
    return;
        
  }
  //tampilin daftar menu berdasarkan kategori
  let x = 0;
  while (x < sortMenu.length ){
    console.log(`No. ${sortMenu[x].id_menu} ${sortMenu[x].nama} - ${sortMenu[x].Harga.toLocaleString()}`);
    x++;
  }
  console.log("-------------------------------------------------------------");
  input(tanyaMenu, inputMenu, sortMenu);
}

function detailMenu(pilihan, noMenu){
  // Mencari menu yang dipilih
  const menuDipilih = pilihan.find(item => item.id_menu === noMenu);
    
  //cek jika id menu tidak ditemukan maka kembali input pilih menunya
  if (!menuDipilih) {
    console.log("Menu tidak ditemukan! Silakan pilih nomor yang tersedia.");
    inputMenu(pilihan);
    return;
  }
  // Menampilkan detail menu
  console.log(`-------------------------------------------------------------`);
  console.log(`-------------------DETAIL PESANAN----------------------------`);
  console.log(`Nama: ${menuDipilih.nama}`);
  console.log(`Harga: Rp ${menuDipilih.Harga.toLocaleString()}`);
  console.log(`Deskripsi: ${menuDipilih.Deskripsi}`);
  input(tanyaJml, inputJmlPsn, menuDipilih);

}

function pushPsnBaru(menuDipilih, jumlah){
  // Menambahkan ke keranjang
  const pesananBaru = {
    nama: menuDipilih.nama,
    harga: menuDipilih.Harga,
    jumlah: jumlah,
    subtotal: menuDipilih.Harga * jumlah
  };
  // masukkan data pesananBaru ke array pesanan
  pesanan.push(pesananBaru);

  console.log(`Berhasil menambahkan ${menuDipilih.nama} sebanyak ${jumlah}x ke keranjang!`);
  console.log(`Subtotal: Rp ${pesananBaru.subtotal.toLocaleString()}`);
  console.log(`-------------------------------------------------------------`);
  input(tanyaPesan, inputTanya,lihatKeranjang);
}

function lihatKeranjang(){
  //Cek jika Pesanan masih kosong
  let totalHarga = 0;
  if (pesanan.length === 0) {
    console.clear();
    console.log("KERANJANG KOSONG SILAHKAN PESAN DULU");
    inputPesan();
    return;
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
  input(tanyaHapus, inputHapus, inputBayar, totalHarga);
}

function cekout(totalBayar, bayar){
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
  pesanan = [];  
  input(tanyaPesan, inputTanya, tutupPesanan);
}

function inputBayar(totalBayar){
  console.log(`Total pembayaran: Rp ${totalBayar.toLocaleString()}`);

  const buatBayar = function(bayar){
    bayar = Number(bayar);    
    if (isNaN(bayar) || bayar < totalBayar) {
      console.log("Uang yang dibayarkan kurang! / inputan bukan number");
      inputBayar(totalBayar);
      return;
    }
    cekout(totalBayar, bayar);
  };
  input("Masukkan jumlah uang yang dibayarkan: Rp ", buatBayar, totalBayar);
}

function inputPesan(){
  console.log("-------------------Selamat Datang Di Popeye------------------");
  console.log(`Silahkan pilih ingin pesan Apa
                1. Paket Makan 
                2. Makanan
                3. Minuman
                4. Lihat Keranjang & Cekout
                5. Keluar `);
  console.log(`-------------------------------------------------------------`);
  const buatPesan =(katMenu)=>{
    katMenu = parseInt(katMenu); //buat inputan menjadi number
    sortirMenu(katMenu);
  };
  input("Pilih menu (1-5): ", buatPesan);
}

const inputMenu = (noMenu, pilihan)=>{
  noMenu = parseInt(noMenu); //buat inputan menjadi Variabel Number 
  //buat kembali ke function sebelumnya
  if (noMenu === 0) {
    inputPesan();
    return;
  }
  detailMenu(pilihan, noMenu); 
};

const inputJmlPsn = (jumlah, menuDipilih) => {
  jumlah = parseInt(jumlah);
  console.log(`-------------------------------------------------------------`);    
  if (isNaN(jumlah) || jumlah < 1) {
    console.log("jumlah pesanan minimal 1 / inputan bukan number");
    input(tanyaJml, inputJmlPsn, menuDipilih);
    return;
  }
  pushPsnBaru(menuDipilih, jumlah);
};

const inputTanya = (jawaban, hasil, harga) => {
  if (jawaban.toLowerCase() === 'y') {
    console.clear;
    inputPesan();
  } else if(jawaban.toLowerCase() === 'n') {
    hasil(harga);
  } else {
    console.log("pilih hanya y atau n");
    input(tanyaPesan, inputTanya, hasil, harga);
  }
};

const inputHapus = (noDel, inputBayar, totalHarga) =>{ 
  if (noDel.toLowerCase() === "n"){
    input(tanyaPesan, inputTanya,inputBayar, totalHarga);
  } else{
    noDel = Number(noDel);
    if (!isNaN(noDel) && noDel > 0 && noDel <= pesanan.length ){
      pesanan.splice(noDel-1, 1);
      console.log(`Pesanan ke ${noDel} berhasil dihapus`);
      lihatKeranjang();
    }else {
      console.log("Pilih hanya nomor yang ada di keranjang atau input n untuk melanjutkan");
      input(tanyaHapus, inputHapus, inputBayar, totalHarga);
    }
  }     
};

function input(text, cb, param1, param2){
  rl.question(text, (jawaban)=>{
    cb(jawaban,param1,param2);
  });
}

inputPesan();