/**
 * guarding process to cek variabel Array of object
 * @param {ListMenu[]} arr An array of menu object
 * @throws {Error} message error
 */
//proses guarding
exports.guarding = (arr) =>{
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
  const itemObjectNotNull = arr.every(item =>{
    return Object.keys(item).length > 0;
  });

  if (!itemObjectNotNull) {
    throw new Error("property object of array menu tidak boleh osong");
  }

};