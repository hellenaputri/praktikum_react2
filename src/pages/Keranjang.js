import React, { Component } from "react";
import $ from "jquery";
import Card from "../Components/Card";

class Keranjang extends Component {
    constructor() {
        super()
        this.state = {
            barang: [
                {
                    nama: "Kopi Luwak White Koffie", harga: 11000,
                    cover: "https://cf.shopee.co.id/file/3f1ab53630ce38735f1a098abedeb68f"
                },
                {
                    nama: "Minyak Goreng", harga: 20000,
                    cover: "https://www.99.co/blog/indonesia/wp-content/uploads/2020/04/minyak-bimoli.jpg"
                }
            ],

            action: "",
            harga: 0,
            nama: "",
            cover: "",
            selectedItem: null,
        }
    }

    Add = () => {
        $("#modal_barang").modal("show")
        this.setState({
            nama: "",
            harga: 0,
            cover: "",
            action: "insert",
        })
    }

    Edit = (item) => {
        $("#modal_barang").modal("show")
        this.setState({
            nama: item.nama,
            harga: item.harga,
            cover: item.cover,
            action: "update",
            selectedItem: item
        })
    }

    Save = (event) => {
        event.preventDefault();

        let tempBarang = this.state.barang

        if (this.state.action === "insert") {
            //menambah data agenda
            tempBarang.push({
                nama: this.state.nama,
                harga: this.state.harga,
                cover: this.state.cover
            })
        } else if (this.state.action === "update") {
            //menyimpan perubahan data
            let index = tempBarang.indexOf(this.state.selectedItem)

            tempBarang[index].nama = this.state.nama
            tempBarang[index].harga = this.state.harga
            tempBarang[index].cover = this.state.cover

        }

        this.setState({ barang: tempBarang })

        //menutup komponen modal_barang
        $("#modal_barang").modal("hide")
    }

    Drop = (item) => {
        //konfirmasi
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            //mengapus data
            let tempBarang = this.state.barang
            //posisi index yang akan dihapus
            let index = tempBarang.indexOf(item)

            //hapus data
            tempBarang.splice(index, 1)

            this.setState({ barang: tempBarang })
        }
    }

    setUser = () => {
        // cek eksistensi dari session storage
        if (localStorage.getItem("user") === null) {
            // kondisi jika session storage "user" belum dibuat
            let prompt = window.prompt("Masukkan Nama Anda", "")
            if (prompt === null || prompt === "") {
                // jika user tidak mengisikan namanya
                this.setUser()
            } else {
                // jika user telah mengisikan namanya

                // simpan nama user ke session storage
                localStorage.setItem("user", prompt)

                // simpan nama user ke state.user
                this.setState({ user: prompt })
            }
        } else {
            // kondisi saat session storage "user" telah dibuat

            // akses nilai dari session storage "user"
            let name = localStorage.getItem("user")
            this.setState({ user: name })
        }
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []

        // cek eksistensi dari data cart pada localStorage
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }

        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.nama === selectedItem.nama)

        if (existItem) {
            // jika item yang dipilih ada pada keranjang belanja
            window.alert("Anda telah memilih item ini")
        } else {
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt("Masukkan jumlah item yang beli", "")
            if (promptJumlah !== null && promptJumlah !== "") {
                // jika user memasukkan jumlah item yg dibeli

                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.jumlahBeli = promptJumlah

                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)

                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    componentDidMount() {
        this.setUser()
    }

    render() {
        return (
            <div className="container">
                <h4 className="text-info my-2">
                    Nama Pengguna: {this.state.user}
                </h4>
                <div className="row">
                    {this.state.barang.map((item, index) => (
                        <Card
                            nama={item.nama}
                            harga={item.harga}
                            stok={item.stok}
                            total={item.total}
                            cover={item.cover}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                            onCart={() => this.addToCart(item)}
                        />
                    ))}
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>
                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_barang">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-header">
                                Form Barang
                            </div>

                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Barang
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value })}
                                        required />

                                    Harga Barang
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ev => this.setState({ harga: ev.target.value })}
                                        required />

                                    Cover Barang
                                    <input type="url" className="form-control mb-2"
                                        value={this.state.cover}
                                        onChange={ev => this.setState({ cover: ev.target.value })}
                                        required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Keranjang;