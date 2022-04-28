import React from "react";
import { Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Keranjang from "./pages/Keranjang";
import Cart from "./pages/Cart";

class Main extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/barang" element={<Keranjang />}></Route>
                <Route path="/keranjang" element={<Cart />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Routes>
        )
    }
}

export default Main;