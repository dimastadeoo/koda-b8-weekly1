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

const {createInterface} = require("node:readline")
const rl = createInterface({
    input : process.stdin,
    output : process.stdout
})

function tampilMenu(){
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
        console.log(`-------------------------------------------------------------`)
        //sortir menu berdaasarkan kategori
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
                console.log("Terima kasih telah berkunjung!")
                rl.close()
                return

            //pilihan jika tidak sesuai input yang diinginkan
            default:
                console.log("ketikkan hanya nomor 1-5")
                tampilMenu()
                return
            
            }
            //tampilin daftar menu berdasarkan kategori
            let x = 0
            while (x < sortMenu.length ){
                console.log(`No. ${sortMenu[x].id_menu} ${sortMenu[x].nama} - ${sortMenu[x].Harga.toLocaleString()}`)
                x++
            }
        console.log("-------------------------------------------------------------")
        pilihMenu(sortMenu)
    
    })

}

tampilMenu()

