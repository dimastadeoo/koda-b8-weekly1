const {createInterface} = require("node:readline");
const rl = createInterface({
  input : process.stdin,
  output : process.stdout
});

function convertTanggal(isiTgl){
  // buat dulu input menjadi array, dimana kita ambil datanya sebelum dipisah -
  const partKal = isiTgl.split('-');

  //cek jika panjang arraynya setelah dipisah kurang dari 3 maka format salah
  if (partKal.length !== 3) {
    console.log("Format tanggal DD-MM-YYYY");
    isiTanggal();
    return;
  }
  // lalu masukkan isian 3 indeks tadi masing masing ke dalam variabel
  const [day, month, year] = partKal.map(Number);

  //Buat variabel tanggal dari objek Date menggunakan data year, month-1(karena pada object Date bulan januari adalah 0), day
  const tanggal = new Date(year, month - 1, day);

  // Verifikasi bahwa tahun, bulan, dan tanggal sesuai (mencegah 31-02-2015)
  if (
    tanggal.getDate() === day &&
        tanggal.getMonth() === month - 1 &&
        tanggal.getFullYear() === year
  ) {
    //merubah tanggal sesuai format penanggalan indonesia
    console.log(tanggal.toLocaleDateString("id-ID"));
    rl.close();
  } else {
    console.log("Format Tanggal Salah");
    isiTanggal();
    return;
  }
}
const isiTanggal = ()=>{
  rl.question("Inputkan tgl: ", (isiTgl) => {
    convertTanggal(isiTgl);
  });
};
isiTanggal();