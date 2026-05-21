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
  //proses pilih kategori menu yang dipilih dan sortir berdasarkan kategori
  inputPesan();
  async function pilihKategori() {
    return await inputData.inputDt("Pilih menu (1-5): ");
  }
  const inputKategori = await pilihKategori();
  const sortMenu = sortirMenu(inputKategori, menu,payment, tutupPesanan, main, pesanan);
  //proses untuk pilih menu dan menampilkan detail menunya
  async function detail() {
    return await inputData.inputDt(tanyaMenu);
  }
  const inputDetail = await detail();
  const menuDipilih = detailMenu(sortMenu, inputDetail, main, detail);
  //proses untuk input jumlah yang dipesan dan menambahkan ke keranjang
  async function pushPesan() {
    return await inputData.inputDt(tanyaJml);
  }
  const inpJml = await pushPesan();
  const tambahPesanan = pushPsnBaru(menuDipilih, inpJml, pushPesan);
  pesanan.push(tambahPesanan);
  //proses untuk tanya apakah akan pesan lagi jika y maka kembali ke main(), jika n ke proses pembayaran
  async function tanya() {
    const jawaban = await input(tanyaPesan);
    if (jawaban.toLowerCase() === 'y') {
      console.clear;
      main();
    } else if(jawaban.toLowerCase() === 'n') {
      payment(pesanan);
    } else {
      console.log("pilih hanya y atau n");
      tanya();
    }
  }
  tanya(); //pemanggilan function untuk tanya akan pesan lagi?

}

async function payment(keranjang) {
  //proses untuk melihat semua pesanan dan menampilkan total yang harus dibayar
  const totalBayar = await lihatKeranjang(keranjang, main);
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
  cekout(totalBayar, pembayaran, keranjang);
  tutupPesanan();
  
}

main();