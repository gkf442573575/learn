import {
    observable,
    action,
    computed
} from 'mobx';


class Order {

    @observable list = []
    
    @action.bound pushOrder(item) {
        this.list.push(item)
    }
    @computed get orderLen() {
        return this.list.length;
    }
}

export default Order;