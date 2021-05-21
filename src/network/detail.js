import { request } from './request'
//请求商品数据
export function getDetailData(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
//请求推荐数据
export function getRecommendGood() {
    return request({
        url: '/recommend'
    })
}
//将商品信息封装在一个类中
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

//将商家信息放在一个类中
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

//将商品尺码参数信息保存
export class GoodsParam {
    constructor(info, rule) {
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;

    }
}