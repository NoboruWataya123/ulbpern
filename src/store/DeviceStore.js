import { makeAutoObservable } from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            { id: 1, name: "Phones" },
            { id: 2, name: "Tablets" },
            { id: 3, name: "Laptops" },
        ]
        this._brands = [
            { id: 1, name: "Apple", price: 1000000, rating: 5, img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" },
            { id: 2, name: "Samsung", price: 2000000, rating: 4, img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" },
            { id: 3, name: "Xiaomi", price: 3000000, rating: 3, img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" },
            { id: 4, name: "Huawei", price: 4000000, rating: 2, img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" },
            { id: 5, name: "Oppo", price: 5000000, rating: 1, img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" },
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }

}