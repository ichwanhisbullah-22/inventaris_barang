const STORAGE_KEY = "inventaris_barang";

let dataBarang =
JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let editIndex = -1;

const kodeBarang = document.getElementById("kodeBarang");
const namaBarang = document.getElementById("namaBarang");
const kategori = document.getElementById("kategori");
const jumlahStok = document.getElementById("jumlahStok");
const hargaJual = document.getElementById("hargaJual");

const btnSimpan = document.getElementById("btnSimpan");
const btnReset = document.getElementById("btnReset");

const tabelBody = document.getElementById("tabelBody");

function saveToStorage() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dataBarang)
    );
}

function renderTable() {

    tabelBody.innerHTML = "";

    if(dataBarang.length === 0){

        tabelBody.innerHTML = `
        <tr>
        <td colspan="6">
        Belum ada data barang
        </td>
        </tr>`;
        return;
    }

    dataBarang.forEach((item,index)=>{

        tabelBody.innerHTML += `
        <tr onclick="editBarang(${index})">
            <td>${item.kode}</td>
            <td>${item.nama}</td>
            <td>${item.kategori}</td>
            <td>${item.stok}</td>
            <td>Rp ${Number(item.harga).toLocaleString('id-ID')}</td>
            <td>
                <button onclick="hapusBarang(event,${index})">
                Hapus
                </button>
            </td>
        </tr>`;
    });
}

btnSimpan.addEventListener("click",()=>{

    const barang = {
        kode:kodeBarang.value,
        nama:namaBarang.value,
        kategori:kategori.value,
        stok:jumlahStok.value,
        harga:hargaJual.value
    };

    if(
        barang.kode==="" ||
        barang.nama==="" ||
        barang.stok==="" ||
        barang.harga===""
    ){
        alert("Lengkapi data!");
        return;
    }

    if(editIndex===-1){

        dataBarang.push(barang);

    }else{

        dataBarang[editIndex]=barang;
        editIndex=-1;
    }

    saveToStorage();
    renderTable();
    resetForm();
});

function editBarang(index){

    editIndex=index;

    kodeBarang.value=dataBarang[index].kode;
    namaBarang.value=dataBarang[index].nama;
    kategori.value=dataBarang[index].kategori;
    jumlahStok.value=dataBarang[index].stok;
    hargaJual.value=dataBarang[index].harga;
}

function hapusBarang(event,index){

    event.stopPropagation();

    if(confirm("Hapus data?")){

        dataBarang.splice(index,1);

        saveToStorage();
        renderTable();
    }
}

function resetForm(){

    kodeBarang.value="";
    namaBarang.value="";
    jumlahStok.value="";
    hargaJual.value="";
    kategori.selectedIndex=0;
}

btnReset.addEventListener("click",resetForm);

renderTable();
