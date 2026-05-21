const fs = require("node:fs/promises");
const {tanya:input, tutup:tutupPesanan} = require("./function-tanya.js");
const {inputPesan, sortirMenu} = require("./feature/sortir-menu.js");
const {detailMenu} = require("./feature/detail-menu.js");
const {pushPsnBaru} = require("./feature/push-pesanan.js");
const {lihatKeranjang} = require("./feature/keranjang.js");
const {cekout} = require("./feature/bayar.js");

const tanyaPesan = "Ingin memesan menu lain? (y/n): ";
const tanyaJml = "Masukkan jumlah pesanan: ";
const tanyaMenu = "Masukkan nomor menu / atau ketik 0 untuk kembali): ";
let pesanan = [];
let menu =[];
//proses guarding
const guarding = (arr) =>{
  //cek variabel aapakah merupakan array
  if (!Array.isArray(arr)) {
    throw new Error("menu tidak berupa array");
  }
  // cek apakah array kosong
  if (arr.length === 0) {
    throw new Error("array menu kosong / tidak konek ke json menu");
  }
  //nilai kondisi untuk cek elemen array berupa objetc
  const semuaObjek = arr.every(item => {
    return typeof item === 'object' && item !== null && !Array.isArray(item);
  });

  if (!semuaObjek) {
    throw new Error("elemen array menu harus berupa object");
  }
};
//function tanya jika ingin pesan lagi
async function tanya(cb) {
  const jawaban = await input(tanyaPesan);
  if (jawaban.toLowerCase() === 'y') {
    console.clear;
    main();
  } else if(jawaban.toLowerCase() === 'n') {
    cb();
  } else {
    console.log("pilih hanya y atau n");
    tanya();
  }
}

async function main(){
  //ambil data menu dari file menu.json
  menu = await fs.readFile("menu.json", "utf-8");
  menu = JSON.parse(menu); //ubah ke json
  guarding(menu); // proses guarding
  //method untuk input data
  const inputData = {
    pesan : function(text){
      return text;
    },
    inputDt : async function(text) {
      let masukan = await input(this.pesan(text));
      masukan = parseInt(masukan);
      return masukan;
      
    }
  };
  let sortMenu;
  let inputKategori;
  //proses pilih kategori menu yang dipilih dan sortir berdasarkan kategori
  while(true){
    inputPesan();
    inputKategori = await inputData.inputDt("Pilih menu (1-5): ");
    sortMenu = await sortirMenu(inputKategori, menu, payment, tutupPesanan);
    if (sortMenu !== false){
      break;
    }
  }
  //proses untuk pilih menu dan menampilkan detail menunya
  let inputDetail;
  let menuDipilih;
  while(true){
    inputDetail = await inputData.inputDt(tanyaMenu);
    menuDipilih = await detailMenu(sortMenu, inputDetail, main);
    if (menuDipilih !== false){
      break;
    }
  }
  //proses untuk input jumlah yang dipesan dan menambahkan ke keranjang
  let inpJml;
  let tambahPesanan;
  while(true){
    inpJml = await inputData.inputDt(tanyaJml);
    tambahPesanan = await pushPsnBaru(menuDipilih, inpJml);
    if (tambahPesanan !== false){
      break;
    }
  }
  pesanan.push(tambahPesanan);
  tanya(payment); //pemanggilan function untuk tanya akan pesan lagi?

}

async function payment() {
  //proses untuk melihat semua pesanan dan menampilkan total yang harus dibayar
  const totalBayar = await lihatKeranjang(pesanan, main);
  console.log(`Total pembayaran: Rp ${totalBayar.toLocaleString()}`);
  //proses input pembaran
  async function bayar() {
    let inputBayar = await input("Masukkan jumlah uang yang dibayarkan: Rp ");
    inputBayar = parseInt(inputBayar);
    return inputBayar;
  }
  const pembayaran = await bayar();
  //proses guarding jika pembayaran kurang atau input     
  if (isNaN(pembayaran) || pembayaran < totalBayar) {
    console.log("Uang yang dibayarkan kurang! / inputan bukan number");
    bayar();
    return;
  }
  cekout(totalBayar, pembayaran, pesanan);
  pesanan = [];
  tanya(tutupPesanan);
  
}

main();