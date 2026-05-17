const menu =[
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
    },
    {
        id_menu : 4,
        nama : "Whole Signature Crispy Chicken",
        Harga : 148500,
        Deskripsi : "1 whole signature crispy chicken",
        Kategori : "makanan"
    },
    {
        id_menu : 5,
        nama : "Poppin crispy chicken burger",
        Harga : 32000,
        Deskripsi : "1 Crispy chicken burger",
        Kategori : "makanan"
    },
    {
        id_menu : 6,
        nama : "popin 2pcs crispy chicken",
        Harga : 38000,
        Deskripsi : "2 crispy chicken",
        Kategori : "makanan"
    },
    {
        id_menu : 7,
        nama : "Signature crispy chicken sandwich",
        Harga : 58500,
        Deskripsi : "1 Signature crispy chicken sandwich",
        Kategori : "makanan"
    },
    {
        id_menu : 8,
        nama : "Lychee Tea Medium",
        Harga : 31000,
        Deskripsi : "1 Lychee Tea Medium",
        Kategori : "minuman"
    },
    {
        id_menu : 9,
        nama : "Mineral Water",
        Harga : 16500,
        Deskripsi : "1 Mineral Water",
        Kategori : "minuman"
    },
    {
        id_menu : 10,
        nama : "Coke Medium",
        Harga : 23500,
        Deskripsi : "1 Coke Medium",
        Kategori : "minuman"
    },
    {
        id_menu : 11,
        nama : "Jasmine Tea Medium",
        Harga : 23500,
        Deskripsi : "1 Jasmine Tea Medium",
        Kategori : "minuman"
    }
]

const tutupPesanan = () => {
    console.clear
    console.log("Terima kasih telah berkunjung!");
    rl.close();
};

let pesanan =[]

const {createInterface} = require("node:readline")
const rl = createInterface({
    input : process.stdin,
    output : process.stdout
})

function sortirMenu(katMenu){
    //sortir menu berdaasarkan kategori
    let sortMenu =[]
    switch (katMenu){
        case 1:
            sortMenu = menu.filter(item => item.Kategori === "paket")
            console.log("-------------------MENU PAKET--------------------------------")
            break
        case 2:
            sortMenu = menu.filter(item => item.Kategori === "makanan")
            console.log("-------------------MENU MAKANAN-------------------------------")
            break
        case 3:
            sortMenu = menu.filter(item => item.Kategori === "minuman")
            console.log("-------------------MENU MINUMAN-------------------------------")
            break
        case 4:
            lihatKeranjang()
            return
        case 5:
            tutupPesanan()
            return
        //pilihan jika tidak sesuai input yang diinginkan
        default:
            console.log("ketikkan hanya nomor 1-5")
            inputPesan()
            return
        
        }
        //tampilin daftar menu berdasarkan kategori
        let x = 0
        while (x < sortMenu.length ){
            console.log(`No. ${sortMenu[x].id_menu} ${sortMenu[x].nama} - ${sortMenu[x].Harga.toLocaleString()}`)
            x++
        }
    console.log("-------------------------------------------------------------")
    inputMenu(sortMenu)
}

function detailMenu(pilihan, noMenu){
    // Mencari menu yang dipilih
    const menuDipilih = pilihan.find(item => item.id_menu === noMenu)
    
    //cek jika id menu tidak ditemukan maka kembali input pilih menunya
    if (!menuDipilih) {
        console.log("Menu tidak ditemukan! Silakan pilih nomor yang tersedia.")
        inputMenu(pilihan)
        return
    }
    // Menampilkan detail menu
    console.log(`-------------------------------------------------------------`)
    console.log(`-------------------DETAIL PESANAN----------------------------`)
    console.log(`Nama: ${menuDipilih.nama}`)
    console.log(`Harga: Rp ${menuDipilih.Harga.toLocaleString()}`)
    console.log(`Deskripsi: ${menuDipilih.Deskripsi}`)
    inputJmlPsn(menuDipilih)

}

function pushPsnBaru(menuDipilih, jumlah){
    // Menambahkan ke keranjang
    const pesananBaru = {
        nama: menuDipilih.nama,
        harga: menuDipilih.Harga,
        jumlah: jumlah,
        subtotal: menuDipilih.Harga * jumlah
    }
    // masukkan data pesananBaru ke array pesanan
    pesanan.push(pesananBaru)

    console.log(`Berhasil menambahkan ${menuDipilih.nama} sebanyak ${jumlah}x ke keranjang!`)
    console.log(`Subtotal: Rp ${pesananBaru.subtotal.toLocaleString()}`)
    console.log(`-------------------------------------------------------------`)
    inputTanya(lihatKeranjang)
}

function lihatKeranjang(){
    //Cek jika Pesanan masih kosong
    let totalHarga = 0
    if (pesanan.length === 0) {
        console.clear()
        console.log("KERANJANG KOSONG SILAHKAN PESAN DULU")
        inputPesan()
        return
    }

    //Data Keranjang Belanja yang ditampung di array pesanan
    console.log(`-------------------------------------------------------------`)
    console.log(`----------------KERANJANG BELANJA----------------------------`)
    //inisiasi looping
    let y=0
    while (y < pesanan.length){
        console.log(`${y + 1}. ${pesanan[y].nama}`)
        console.log(`${pesanan[y].jumlah}x @ Rp ${pesanan[y].harga.toLocaleString()}`)
        console.log(`Subtotal: Rp ${pesanan[y].subtotal.toLocaleString()}`)
        totalHarga += pesanan[y].subtotal
        y++
    }
    console.log(`-------------------------------------------------------------`)
    console.log(`TOTAL HARGA: Rp ${totalHarga.toLocaleString()}`)
    console.log(`-------------------------------------------------------------`)
    inputTanya(inputBayar, totalHarga)
}

function cekout(totalBayar, bayar){
    console.clear
    const kembalian = bayar - totalBayar
    console.log(`-----------------------STRUK PEMBAYARAN----------------------`)
    console.log(`                       Popeye Chicken`)
    console.log(`-------------------------------------------------------------`)
    //inisiasi looping
    x = 0
    while (x < pesanan.length){
        console.log(`# ${pesanan[x].nama}`)
        console.log(`${pesanan[x].jumlah}x @ Rp ${pesanan[x].harga.toLocaleString()} = Rp ${pesanan[x].subtotal.toLocaleString()}`)
        x++
    }     
    console.log(`-------------------------------------------------------------`)
    console.log(`Total    : Rp ${totalBayar.toLocaleString()}`)
    console.log(`Bayar    : Rp ${bayar.toLocaleString()}`)
    console.log(`Kembali  : Rp ${kembalian.toLocaleString()}`)
    console.log(`-------------------------------------------------------------`)
    console.log("Terima kasih atas pesanan Anda!")
    console.log(`-------------------------------------------------------------`)
    // Reset keranjang setelah checkout
    pesanan = []   
    inputTanya(tutupPesanan)
}

function inputBayar(totalBayar){
    console.log(`Total pembayaran: Rp ${totalBayar.toLocaleString()}`)
    //Memasukkan jumlah pembayaran
    rl.question("Masukkan jumlah uang yang dibayarkan: Rp ", function(bayar){
        bayar = Number(bayar)
        
        if (isNaN(bayar) || bayar < totalBayar) {
            console.log("Uang yang dibayarkan kurang! / inputan bukan number")
            inputBayar(totalBayar)
            return
        }
        cekout(totalBayar, bayar)
    })
    
}

function inputPesan(){
    console.clear
    console.log("-------------------Selamat Datang Di Popeye------------------")
    console.log(`Silahkan pilih ingin pesan Apa
                1. Paket Makan 
                2. Makanan
                3. Minuman
                4. Lihat Keranjang & Cekout
                5. Keluar `)
    console.log(`-------------------------------------------------------------`)
    rl.question("Pilih menu (1-5): ", function(katMenu) {   
        katMenu = Number(katMenu) //buat inputan menjadi number
        sortirMenu(katMenu)
    })
}

function inputMenu(pilihan){
    rl.question("Masukkan nomor menu / atau ketik 0 untuk kembali): ", function(noMenu) {
        noMenu = Number(noMenu) //buat inputan menjadi Variabel Number 
        //buat kembali ke function sebelumnya
        if (noMenu === 0) {
            tampilMenu()
            return
        }
        detailMenu(pilihan, noMenu) 
    })
}

function inputJmlPsn(menuDipilih){
    // Input jumlah pesanan
    console.log(`-------------------------------------------------------------`)
    rl.question("Masukkan jumlah pesanan: ", function(jumlah) {
        jumlah = Number(jumlah)
        console.log(`-------------------------------------------------------------`)    
        if (isNaN(jumlah) || jumlah < 1) {
            console.log("jumlah pesanan minimal 1 / inputan bukan number")
            inputJmlPsn(menuDipilih)
            return
        }
        pushPsnBaru(menuDipilih, jumlah)
    })
}

function inputTanya(hasil, harga){
    rl.question("Ingin memesan menu lain? (y/n): ", function(jawaban) {
        if (jawaban.toLowerCase() === 'y') {
            inputPesan()
        } else if(jawaban.toLowerCase() === 'n') {
            hasil(harga)
        } else {
            console.log("pilih hanya y atau n")
            inputTanya(hasil, harga)
        }
    })
}

inputPesan()
