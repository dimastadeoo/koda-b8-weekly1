const assert = require("node:assert/strict");
const {describe, it} = require(`node:test`);
const {sortirMenu} = require("./feature/sortir-menu.js");
const {detailMenu} = require("./feature/detail-menu.js");
const {pushPsnBaru} = require("./feature/push-pesanan.js");
const {lihatKeranjang} = require("./feature/keranjang.js");
const {cekout} = require("./feature/bayar.js");

describe("sortirMenu process", ()=>{
  const menu = [
    {
      id_menu : 1,
      nama : "Paket 1 krispi pedas manis",
      Harga : 51500,
      Deskripsi : "1 crispy chicken pedas manis + 1 Rice + 1 Medium Drink",
      Kategori : "paket"
    },
    {
      id_menu : 2,
      nama : "Paket 2 krispi pedas manis",
      Harga : 102800,
      Deskripsi : "2 crispy chicken pedas manis + 1 Rice + 1 Lychee Tea Medium",
      Kategori : "makanan"
    },
    {
      id_menu : 3,
      nama : "Paket 1 whole pedas manis",
      Harga : 102800,
      Deskripsi : "1 whole crispy chicken pedas manis + 3 Rice + 3 Coke",
      Kategori : "minuman"
    }
  ];
  it("mengembalikan array of object kategori paket", () => {
    const cb = ()=> {return true;};
    const result = sortirMenu(1, menu, cb);
    assert.equal(Array.isArray(result), true);
    assert.equal(typeof result[0], "object");
  });
  it("mengembalikan array of object kategori makanan", () => {
    const cb = ()=> {return true;};
    const result = sortirMenu(2, menu, cb);
    assert.equal(Array.isArray(result), true);
    assert.equal(typeof result[0], "object");
  });
  it("mengembalikan array of object kategori minuman", () => {
    const cb = ()=> {return true;};
    const result = sortirMenu(3, menu, cb);
    assert.equal(Array.isArray(result), true);
    assert.equal(typeof result[0], "object");
  });

  it("callback dipanggil saat sorting", () => {
    let callbackDipanggil = false;
    const cb = () => {
      callbackDipanggil = true;
    };
    sortirMenu(4, menu, cb);
    assert.strictEqual(callbackDipanggil, true);
  });
  it("default case ketika user input diluar 1-5", () => {
    const cb = ()=> {return true;};
    assert.strictEqual(sortirMenu(8, menu, cb), false);
  });

});

describe("detailMenu process", ()=>{
  const menu = [
    {
      id_menu : 1,
      nama : "Paket 1 krispi pedas manis",
      Harga : 51500,
      Deskripsi : "1 crispy chicken pedas manis + 1 Rice + 1 Medium Drink",
      Kategori : "paket"
    },
    {
      id_menu : 2,
      nama : "Paket 2 krispi pedas manis",
      Harga : 102800,
      Deskripsi : "2 crispy chicken pedas manis + 1 Rice + 1 Lychee Tea Medium",
      Kategori : "paket"
    },
    {
      id_menu : 3,
      nama : "Paket 1 whole pedas manis",
      Harga : 102800,
      Deskripsi : "1 whole crispy chicken pedas manis + 3 Rice + 3 Coke",
      Kategori : "paket"
    }
  ];
  it("mengembalikan object ketika input sesuai", () => {
    const cb = ()=> {return true;};
    const result = detailMenu(menu, 1, cb);
    assert.equal(typeof result, "object");
  });
  it("mengembalikan nilai false jika id tidak ditemukan", () => {
    const cb = ()=> {return true;};
    assert.equal(detailMenu(menu, 4, cb), false);
  });
  it("callback dipanggil saat input angka 0", () => {
    let callbackDipanggil = false;
    const cb = () => {
      callbackDipanggil = true;
    };
    detailMenu(menu, 0, cb);
    assert.strictEqual(callbackDipanggil, true);
  });

});

describe("pushPesanan process", ()=>{
  const menu = 
    {
      id_menu : 3,
      nama : "Paket 1 whole pedas manis",
      Harga : 102800,
      Deskripsi : "1 whole crispy chicken pedas manis + 3 Rice + 3 Coke",
      Kategori : "paket"
    };
  it("mengembalikan object ketika input sesuai", () => {
    const result = pushPsnBaru(menu, 5);
    assert.equal(typeof result, "object");
  });
  it("mengembalikan nilai false jika input jumlah dibawah 1, bukan angka dan null", () => {
    assert.equal(pushPsnBaru(menu, 0), false);
    assert.strictEqual(pushPsnBaru(menu, "E"), false);
    assert.strictEqual(pushPsnBaru(menu, null), false);
  });

});

describe("lihatKeranjang process", ()=>{
  const cart = [
    {
      nama : "Paket 1 whole pedas manis",
      harga : 102800,
      jumlah : 1,
      subtotal : 102800
    },
    {
      nama : "Paket 2 whole pedas manis",
      harga : 52000,
      jumlah : 2,
      subtotal : 104000
    }
  ];
  it("callback dipanggil ketika keranjang kosong", () => {
    let callbackDipanggil = false;
    const cb = () => {
      callbackDipanggil = true;
    };
    lihatKeranjang([], cb);
    assert.strictEqual(callbackDipanggil, true);
  });
  it("mengembalikan nilai total harga keranjang", () => {
    const cb = () => {return;};
    assert.equal(lihatKeranjang(cart, cb), 206800);
  });

});

describe("cekout process", ()=>{
  const cart = [
    {
      nama : "Paket 1 whole pedas manis",
      harga : 102800,
      jumlah : 1,
      subtotal : 102800
    },
    {
      nama : "Paket 2 whole pedas manis",
      harga : 52000,
      jumlah : 2,
      subtotal : 104000
    }
  ];
  it("mengembalikan nilai false jika input bayar < totalBayar, bukan angka dan null", () => {
    assert.strictEqual(cekout(206800, 30000, cart), false);
    assert.strictEqual(cekout(206800, "ff", cart), false);
    assert.strictEqual(cekout(206800, null, cart), false);
  });
  it("mengembalikkan nilai array kosong ketika input bayar >= totalBayar", ()=>{
    assert.deepEqual(cekout(206800, 210000, cart), []);
  });

});

