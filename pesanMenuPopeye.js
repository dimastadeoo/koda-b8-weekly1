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
async function main(){
  let menu = await fs.readFile("menu.json", "utf-8");
  menu = JSON.parse(menu);
  inputPesan();
  let input1 = await input("Pilih menu (1-5): ");
  input1 = parseInt(input1); //buat inputan menjadi number
  const sortMenu = sortirMenu(input1, menu,payment, tutupPesanan, main, pesanan);
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
  pesanan.push(tambahPesanan);
  async function tanya() {
    let jawaban = await input(tanyaPesan);
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
  tanya();
}

async function payment(keranjang) {
  const totalBayar = await lihatKeranjang(keranjang, main);
  console.log(`Total pembayaran: Rp ${totalBayar.toLocaleString()}`);
  async function bayar() {
    let inputBayar = await input("Masukkan jumlah uang yang dibayarkan: Rp ");
    inputBayar = parseInt(inputBayar);
    return inputBayar;
  }
  const pembayaran = await bayar();    
  if (isNaN(pembayaran) || pembayaran < totalBayar) {
    console.log("Uang yang dibayarkan kurang! / inputan bukan number");
    bayar();
    return;
  }
  cekout(totalBayar, pembayaran, keranjang);
  tutupPesanan();
  
}

main();