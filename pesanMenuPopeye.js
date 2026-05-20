const fs = require("node:fs/promises");
const {tanya:input, tutup:tutupPesanan} = require("./function-tanya.js");
const {inputPesan, sortirMenu} = require("./feature/sortir-menu.js");
const {detailMenu} = require("./feature/detail-menu.js");
const {pushPsnBaru} = require("./feature/push-pesanan.js");

let pesanan =[];
const tanyaPesan = "Ingin memesan menu lain? (y/n): ";
const tanyaJml = "Masukkan jumlah pesanan: ";
const tanyaMenu = "Masukkan nomor menu / atau ketik 0 untuk kembali): ";
const tanyaHapus = "Jika ingin hapus, Ketik Nomor Pesanan / ketik n jika sudah beres: ";

async function main(){
  let menu = await fs.readFile("menu.json", "utf-8");
  menu = JSON.parse(menu);
  inputPesan();
  let input1 = await input("Pilih menu (1-5): ");
  input1 = parseInt(input1); //buat inputan menjadi number
  const sortMenu = sortirMenu(input1, menu,lihatKeranjang, tutupPesanan, main);
  async function detail() {
    let input2 = await input(tanyaMenu);
    input2 = parseInt(input2);
    return input2;
  }
  const detailPesan = await detail();
  const menuDipilih = detailMenu(sortMenu, detailPesan, main, detail);
  async function pushPesan() {
    let input3 = await input(tanyaJml);
    input3 = parseInt(input3);
    return input3;
  }
  const inpJml = await pushPesan();
  const tambahPesanan = pushPsnBaru(menuDipilih, inpJml, pushPesan);
  
}

function lihatKeranjang(){
  //Cek jika Pesanan masih kosong
  let totalHarga = 0;
  if (pesanan.length === 0) {
    console.clear();
    console.log("KERANJANG KOSONG SILAHKAN PESAN DULU");
    main();
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



const inputTanya = (jawaban, hasil, harga) => {
  if (jawaban.toLowerCase() === 'y') {
    console.clear;
    main();
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

main();
