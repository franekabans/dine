import React from 'react';

export default class Cart {

    static myInstance = null;

    _clientID = null;
    _resID = -1;
    _resname = '';
    _foods =[];

    /**
     * @returns {Cart}
     */
    static getInstance() {
        if (Cart.myInstance == null) {
            Cart.myInstance = new Cart();
        }

        return this.myInstance;
    }

    getUserID() {
        return this._clientID;
    }

    setUserID(id) {
        this._clientID = id;
    }

    getResID() {
        return this._resID;
    }

    setResID(id) {
        if(this._resID == -1){
         this._resID = id;
        }
        else {
            this.clearCart()
            this._resID = id
        }
    }

    getResName() {
        return this._resname;
    }

    setResName(namie) {
        this._resname = namie;
    }

    addToCart(somefood){
        for (var i=0; i < this._foods.length; i++) {
            console.log('sup')
            if(this._foods[i].id === somefood.id){
                this._foods[i].qty = this._foods[i].qty+1;
                return;
            }   
       }
        this._foods.push(somefood);
    }

    getCart(){
        return this._foods;
    }

     printCart(){
        return JSON.stringify(this._foods);
    }

    clearCart(){
        this._foods = []
    }

    isCartEmpty(){
        return this._foods.length == []
    }

    clearCartItemID(itemID){
        const value_to_remove = itemID
        const filteredItems = this._foods.filter(item => item.id !== value_to_remove )
        console.log('sth happends')
        this._foods = filteredItems;
    }


}