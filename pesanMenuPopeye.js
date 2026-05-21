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
  
  inputPesan();
  async function pilihKategori() {
    return await inputData.inputDt("Pilih menu (1-5): ");
  }
  const inputKategori = await pilihKategori();
  const sortMenu = sortirMenu(inputKategori, menu,payment, tutupPesanan, main, pesanan);

  async function detail() {
    return await inputData.inputDt(tanyaMenu);
  }
  const inputDetail = await detail();
  const menuDipilih = detailMenu(sortMenu, inputDetail, main, detail);

  async function pushPesan() {
    return await inputData.inputDt(tanyaJml);
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