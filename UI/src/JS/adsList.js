class AdsList{
    _adList = [];
    constructor(adList){
        this._adList = adList.concat();
    }

    getPage(skip = 0, top = 10, filterConfig = undefined){
        if (typeof skip !== 'number' || typeof top !== 'number') {
            console.log('Error with inputting types!');
            return;
        }
    
        let returningAds = this._adList;
        if (filterConfig){
        
            for (let parameter in filterConfig){
                if (parameter === 'hashTags' && filterConfig.hashTags.size != 0){
                    filterConfig.hashTags.forEach(tag => {
                        returningAds = returningAds.filter(ad => ad.hashTags.includes(tag));
                    });
                }
                if (parameter === 'dateFrom' && filterConfig.dateFrom.length != 0){
                    let dateFrom = new Date(filterConfig.dateFrom);
                    returningAds = returningAds.filter(ad => ad.createdAt >= dateFrom);
                }
                else if (parameter === 'vendor' && filterConfig.vendor.length != 0){
                    returningAds = returningAds.filter(ad => ad.vendor === filterConfig.vendor);
                }
            }
        }
            
        returningAds.sort(this._comparator);
        return returningAds.slice(skip, skip + top);
    
    }
    getFilteredSize(skip = 0, filterConfig = undefined){
        if (typeof skip !== 'number') {
            console.log('Error with inputting types!');
            return;
        }
    
        let returningAds = this._adList;
        if (filterConfig){
        
            for (let parameter in filterConfig){
                if (parameter === 'hashTags' && filterConfig.hashTags.size != 0){
                    filterConfig.hashTags.forEach(tag => {
                        returningAds = returningAds.filter(ad => ad.hashTags.includes(tag));
                    });
                }
                if (parameter === 'dateFrom' && filterConfig.dateFrom.length != 0){
                    let dateFrom = new Date(filterConfig.dateFrom);
                    returningAds = returningAds.filter(ad => ad.createdAt >= dateFrom);
                }
                else if (parameter === 'vendor' && filterConfig.vendor.length != 0){
                    returningAds = returningAds.filter(ad => ad.vendor === filterConfig.vendor);
                }
            }
        }
        return returningAds.length;
    }
    _comparator(first, second){
        return second.createdAt - first.createdAt;
    }

    get(id){
        if (typeof id === 'string'){
            return this._adList.find(ad => ad.id === id)
        }
        console.log('Incorrect type of id. Id must be a string.');
    }

    static validate(ad){
        let requiredParams = ['id','label', 'description', 'createdAt', 'link', 'vendor', 'hashTags', 'discount', 'validUntil'];
        for (let i = 0; i < requiredParams.length; i++) {
            if (ad[requiredParams[i]] === undefined) {
                return false;
            }
        }
        for (let param in ad){
            switch (param) {
                case 'id':
                    if (typeof ad.id !== 'string' || ad.id.length === 0) {
                        return false;
                    }
                    break;
                case 'label':
                    if (typeof ad.label !== 'string' || ad.label.length === 0){
                        return false;
                    }
                    break;
                case 'description':
                    if (typeof ad.description !== 'string' || ad.description.length >= 200 || ad.description.length === 0) {
                        return false;
                    }
                    break;
                case 'createdAt':
                    if (!(ad.createdAt instanceof Date)) {
                        return false;
                    }
                    break;
                case 'link':
                    if (typeof ad.link !== 'string' || ad.link.length === 0) {
                        return false;
                    }
                    break;
                case 'vendor':
                    if (typeof ad.vendor !== 'string' || ad.vendor.length === 0) {
                        return false;
                    }
                    break;
                case 'photoLink':
                    if (ad.photoLink && (typeof ad.photoLink !== 'string' || ad.photoLink.length === 0)) {
                        return false;
                    }
                    break;
                case 'hashTags':
                    if (ad.hashTags){
                        if (!ad.hashTags.every(hashtag => typeof hashtag === 'string')){
                            return false;
                        }
                    }
                    break;
                case 'discount':
                    if (typeof ad.discount !== 'string' || ad.discount.length === 0) {
                        return false;
                    }
                    break;
                case 'validUntil':
                    if (!(ad.validUntil instanceof Date)) {
                        return false;
                    }
                    break;
                case 'rating':
                    if (!(typeof ad.rating === 'undefined' || typeof ad.rating === 'number')){
                        return false;
                    }
                    break;
                case 'reviews':
                    if (!Array.isArray(ad.reviews)) {
                        return false;
                    }
                    break;
                default:
                    return false;
            }
        }
        return true;
    }

    add(ad){
        if (AdsList.validate(ad)) {
            this._adList.push(ad);
            return true;
        }
        return false;
    }

    remove(id){
        if (typeof id === 'string'){
            let index = this._adList.findIndex(ad => ad.id === id);
            if (index !== -1){
                this._adList.splice(index, 1);
    
                return true;
            }
        }
        return false;
    }

    edit(id, ad){
        for (let param in ad){
            if (param === 'id' || param === 'vendor' || param === 'createdAt'){
                console.log("You can't change id, vendor, createdAt");
                return false;
            }
        }
        
        var tmpAd = {};
        Object.assign(tmpAd, this.get(id));
        
        for (let param in ad){
            tmpAd[param] = ad[param];
        }
    
        if (!AdsList.validate(tmpAd)){
            return false;
        }
        
        this.remove(id);
        this.add(tmpAd);

        return true;
    }

    addAll(adList){
        return adList.filter(ad => !this.add(ad));
    }
    getAllAds(){
        return this._ads;
    }
    clear(){
        this._adList.splice(0, this._adList.length);
    }
}