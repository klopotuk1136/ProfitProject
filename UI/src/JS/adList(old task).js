(function(){

var adList = [
    {
        id: '1',
        description : 'Скидка на шкафы - до 79%',
        createdAt : new Date('2021-01-21T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '79',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 3,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '2',
        description : 'Скидка на столы - до 73%',
        createdAt : new Date('2021-03-13T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '73',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 4,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '3',
        description : 'Скидка на шкафы - до 76%',
        createdAt : new Date('2021-01-26T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '76',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 2,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '4',
        description : 'Скидка на столы - до 82%',
        createdAt : new Date('2021-01-17T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '82',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 4,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '5',
        description : 'Скидка на шкафы - до 2%',
        createdAt : new Date('2021-01-28T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '2',
        validUntil : new Date('2022-02-21T20:12:32'),
        rating : 2,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '6',
        description : 'Скидка на столы - до 91%',
        createdAt : new Date('2021-01-01T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '91',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 4,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '7',
        description : 'Скидка на шкафы - до 48%',
        createdAt : new Date('2021-01-05T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '48',
        validUntil : new Date('2022-03-21T20:12:32'),
        rating : 1,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '8',
        description : 'Скидка на столы - до 86%',
        createdAt : new Date('2021-01-30T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '86',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 4,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '9',
        description : 'Скидка на шкафы - до 39%',
        createdAt : new Date('2021-01-17T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '39',
        validUntil : new Date('2022-03-21T20:12:32'),
        rating : 2,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '10',
        description : 'Скидка на столы - до 87%',
        createdAt : new Date('2021-01-21T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '87',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 5,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '11',
        description : 'Скидка на шкафы - до 88%',
        createdAt : new Date('2021-02-22T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '88',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 5,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '12',
        description : 'Скидка на столы - до 37%',
        createdAt : new Date('2021-01-24T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '37',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 2,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '13',
        description : 'Скидка на шкафы - до 57%',
        createdAt : new Date('2021-03-12T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '57',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 1,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '14',
        description : 'Скидка на столы - до 40%',
        createdAt : new Date('2021-01-18T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '40',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 4,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '15',
        description : 'Скидка на шкафы - до 4%',
        createdAt : new Date('2021-02-21T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '4',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 3,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '16',
        description : 'Скидка на столы - до 90%',
        createdAt : new Date('2021-02-17T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '90',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 3,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '17',
        description : 'Скидка на шкафы - до 40%',
        createdAt : new Date('2021-01-08T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '40',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 4,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '18',
        description : 'Скидка на столы - до 15%',
        createdAt : new Date('2021-01-09T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '15',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 3,
        reviews : ['Эти столы прекрасны!'] ,
    },
    {
        id: '19',
        description : 'Скидка на шкафы - до 42%',
        createdAt : new Date('2021-03-11T20:12:32'),
        link : 'https://coollockers.ua',
        vendor : 'Locker service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['locker', 'furniture', 'wood'] ,
        discount : '42',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 5,
        reviews : ['Эти шкафы прекрасны!'] ,
    },
    {
        id: '20',
        description : 'Скидка на столы - до 89%',
        createdAt : new Date('2021-01-29T20:12:32'),
        link : 'https://coolTables.ua',
        vendor : 'Table service',
        photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
        hashTags : ['Table', 'furniture', 'wood'] ,
        discount : '89',
        validUntil : new Date('2022-01-21T20:12:32'),
        rating : 4,
        reviews : ['Эти столы прекрасны!'] ,
    },
]

function getAds(skip = 0, top = 10, filterConfig = undefined){
    if (typeof skip !== 'number' || typeof top !== 'number') {
        console.log('Error with inputting types!');
        return;
    }

    let returningAds = adList;
    if (filterConfig){
    
        for (let parameter in filterConfig){
            if (parameter === 'hashTags'){
                filterConfig.hashTags.forEach(tag => {
                    returningAds = returningAds.filter(ad => ad.hashTags.includes(tag));
                });
            }
            if (parameter === 'dateFrom'){
                returningAds = returningAds.filter(ad => ad.createdAt >= filterConfig.dateFrom);
            }
            else if (parameter === 'dateTo'){
                returningAds = returningAds.filter(ad => ad.createdAt < filterConfig.dateTo);
            }
            else if (parameter === 'vendor'){
                returningAds = returningAds.filter(ad => ad.vendor === filterConfig.vendor);
            }
        }
    }
        
    returningAds.sort(comparator);
    return returningAds.slice(skip, skip + top);

}

function comparator(first, second){
    return second - first;
}

function getAd(id){
    if (typeof id === 'string'){
        return adList.find(ad => ad.id === id)
    }
    console.log('Incorrect type of id. Id must be a string.');
}

function validateAd(ad){
    let requiredParams = ['id', 'description', 'createdAt', 'link', 'vendor', 'hashTags', 'discount', 'validUntil'];
    for (let i = 0; i < requiredParams.length; i++) {
        if (ad[requiredParams[i]] === undefined) {
            return false;
        }
    }
    for (param in ad){
        switch (param) {
            case 'id':
                if (typeof ad.id !== 'string' || ad.id.length === 0) {
                    return false;
                }
                break;
            case 'description':
                if (typeof ad.description !== 'string' || ad.description.length >= 200 || ad.description.length === 0) {
                    return false;
                }
                break;
            case 'createdAt':
                if (!ad.createdAt instanceof Date) {
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
                if (!ad.validUntil instanceof Date) {
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

function addAd(ad){
    if (validateAd(ad)) {
        adList.push(ad);
        return true;
    }
    return false;
}

function editAd(id, ad){
    for (let param in ad){
        if (param === 'id' || param === 'vendor' || param === 'createdAt'){
            console.log("You can't change id, vendor, createdAt");
            return false;
        }
    }
    
    var tmpAd = {};
    Object.assign(tmpAd, getAd(id));

    // var tmpAd = {
    //     id: '20',
    //     description : 'Скидка на столы - до 89%',
    //     createdAt : new Date('2021-01-29T20:12:32'),
    //     link : 'https://coolTables.ua',
    //     vendor : 'Table service',
    //     photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
    //     hashTags : ['Table', 'furniture', 'wood'] ,
    //     discount : '89',
    //     validUntil : new Date('2022-01-21T20:12:32'),
    //     rating : 4,
    //     reviews : ['Эти столы прекрасны!'] ,
    // };
    
    for (let param in ad){
        tmpAd[param] = ad[param];
    }

    if (!validateAd(tmpAd)){
        return false;
    }

    let editingAd = getAd(id);

    if (editingAd !== undefined){
        for (let param in ad){
            editingAd[param] = ad[param];
        }
    }
    else {
        return false;
    }
    return true;
}

function removeAd(id){
    if (typeof id === 'string'){
        let index = adList.findIndex(ad => ad.id === id);
        if (index !== -1){
            adList.splice(index, 1);

            return true;
        }
    }
    return false;
}

console.log("20 ads:");
console.log(getAds(0,20));

console.log("Top 5 ads with hashtag locker:");
console.log(getAds(0,5, {hashTags: ['locker']}));

console.log("Top 5 ads with hashtags both locker and table:");
console.log(getAds(0,5, {hashTags: ['locker', 'table']}));

console.log("5 ads from 3, vendor = Locker service:");
console.log(getAds(2,5,{vendor: 'Locker service'}));

console.log("10 ads from 1, date from 2021-03-01:");
console.log(getAds(0,10,{dateFrom: new Date('2021-03-01T00:00:00')}));

console.log("Ad with id = 5:");
console.log(getAd('5'));

console.log("Ad with id = 25:");
console.log(getAd('25'));

console.log("Ad with id that is not a string:");
console.log(getAd(2));

console.log("validation of a normal ad:")
console.log(validateAd({
    id: '20',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    vendor : 'Table service',
    photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : new Date('2022-01-21T20:12:32'),
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));

console.log("validation of a normal ad without a photo:")
console.log(validateAd({
    id: '20',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    vendor : 'Table service',
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : new Date('2022-01-21T20:12:32'),
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));

console.log("validation of an ad with a photoLink as a number:")
console.log(validateAd({
    id: '20',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    vendor : 'Table service',
    photoLink : 8888349,
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : new Date('2022-01-21T20:12:32'),
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));

console.log("validation of an ad without vendor:");
console.log(validateAd({
    id: '20',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : new Date('2022-01-21T20:12:32'),
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));



console.log("validation of an ad with vendor length = 0:");
console.log(validateAd({
    id: '20',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    vendor : '',
    photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : new Date('2022-01-21T20:12:32'),
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));

console.log("validation of an ad with validUntil not a date but a string:");
console.log(validateAd({
    id: '20',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    vendor : 'Table service',
    photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : '2021-01-29T20:12:32',
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));

console.log("Adding a correct ad:");
console.log(addAd({
    id: '21',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    vendor : 'Table service',
    photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : new Date('2022-01-21T20:12:32'),
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));

console.log("Adding an incorrect ad:");
console.log(addAd({
    id: '21',
    description : 'Скидка на столы - до 89%',
    createdAt : new Date('2021-01-29T20:12:32'),
    link : 'https://coolTables.ua',
    vendor : '',
    photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
    hashTags : ['Table', 'furniture', 'wood'] ,
    discount : '89',
    validUntil : new Date('2022-01-21T20:12:32'),
    rating : 4,
    reviews : ['Эти столы прекрасны!'] ,
}));

console.log("Editing discount of an id=1 ad:");
console.log(editAd('1', { discount: '20%' }));

console.log("Incorrect editing discount of an id=1 ad:");
console.log(editAd('1', { discount: '' }));

console.log("Editing vendor of an id=1 ad:");
console.log(editAd('1', { vendor: 'vendor1' }));

console.log("Editing discount of an id=25 ad:");
console.log(editAd('25', { discount: '20%' }));

console.log("Deleting an id=5 ad:");
console.log(removeAd('5'));

console.log("Deleting an id=5 ad but it is already deleted:");
console.log(removeAd('5'));


}());