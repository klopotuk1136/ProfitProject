class View{

    constructor(adList){
        this.ads = new AdsList(adList);
    }

    _getOffer(ad){
        var tags = "";
        ad.hashTags.forEach(tag => {
            tags += `<span class="tag">#${tag}</span>`;
        });
        var reviews = "";
        ad.reviews.forEach(review => {
            reviews += `<span class="review">${review}</span>`;
        });
        var tag = `<span class="tag"></span>`;
            var offer = document.createElement('article');
            offer.className = "offer";
            offer.innerHTML = `
                                <div class="top-info-offer">
                                    <div class="left-info-offer">
                                        <div class="image-and-percent">
                                            <img src="${ad.photoLink}" class="image" alt="Offer photo">
                                            <p class="percent">${ad.discount}%</p>
                                        </div>
                                        <p class="date-expiration">Until ${" " + ad.validUntil.getFullYear() + "-"+ (ad.validUntil.getMonth() + 1) + "-" + ad.validUntil.getDate()}</p>
                                    </div>
                                    <div class="right-info-offer">
                                        <div class="centralized-line-right-info ">
                                            <h3 class="offer-label">${ad.description}</h3>
                                            <p class="seller-name">${ad.vendor}</p>
                                            <a class="seller-link" href="${ad.link}">more info</a>
                                            <div class="buttons">
                                                <button class="button-settings-offer button-offer">
                                                    <svg class="button-svg" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m22.683 9.394-1.88-.239c-.155-.477-.346-.937-.569-1.374l1.161-1.495c.47-.605.415-1.459-.122-1.979l-1.575-1.575c-.525-.542-1.379-.596-1.985-.127l-1.493 1.161c-.437-.223-.897-.414-1.375-.569l-.239-1.877c-.09-.753-.729-1.32-1.486-1.32h-2.24c-.757 0-1.396.567-1.486 1.317l-.239 1.88c-.478.155-.938.345-1.375.569l-1.494-1.161c-.604-.469-1.458-.415-1.979.122l-1.575 1.574c-.542.526-.597 1.38-.127 1.986l1.161 1.494c-.224.437-.414.897-.569 1.374l-1.877.239c-.753.09-1.32.729-1.32 1.486v2.24c0 .757.567 1.396 1.317 1.486l1.88.239c.155.477.346.937.569 1.374l-1.161 1.495c-.47.605-.415 1.459.122 1.979l1.575 1.575c.526.541 1.379.595 1.985.126l1.494-1.161c.437.224.897.415 1.374.569l.239 1.876c.09.755.729 1.322 1.486 1.322h2.24c.757 0 1.396-.567 1.486-1.317l.239-1.88c.477-.155.937-.346 1.374-.569l1.495 1.161c.605.47 1.459.415 1.979-.122l1.575-1.575c.542-.526.597-1.379.127-1.985l-1.161-1.494c.224-.437.415-.897.569-1.374l1.876-.239c.753-.09 1.32-.729 1.32-1.486v-2.24c.001-.757-.566-1.396-1.316-1.486zm-10.683 7.606c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/></svg>
                                                </button>
                                                <button class="button-delete-offer button-offer">
                                                    <svg class="button-svg" id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m442.154 145c10.585 0 17.924-10.701 13.955-20.514-14.093-34.841-48.275-59.486-88.109-59.486h-18.414c-6.867-36.273-38.67-65-77.586-65h-32c-38.891 0-70.715 28.708-77.586 65h-18.414c-39.834 0-74.016 24.645-88.109 59.486-3.969 9.813 3.37 20.514 13.955 20.514zm-202.154-115h32c21.9 0 40.49 14.734 46.748 35h-125.496c6.258-20.266 24.848-35 46.748-35z"/><path d="m111.053 470.196c1.669 23.442 21.386 41.804 44.886 41.804h200.121c23.5 0 43.217-18.362 44.886-41.804l21.023-295.196h-331.938zm185.966-214.945c.414-8.274 7.469-14.655 15.73-14.232 8.274.414 14.646 7.457 14.232 15.73l-8 160c-.401 8.019-7.029 14.251-14.969 14.251-8.637 0-15.42-7.223-14.994-15.749zm-97.768-14.232c8.263-.415 15.317 5.959 15.73 14.232l8 160c.426 8.53-6.362 15.749-14.994 15.749-7.94 0-14.568-6.232-14.969-14.251l-8-160c-.413-8.273 5.959-15.316 14.233-15.73z"/></g></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="line-right-info">
                                            <p class="description-offer">${ad.description}</p>
                                        </div>
                                        <div class="line-right-info">
                                            <p class="hashtags-offer">Hashtags:
                                                ${tags}
                                            </p>
                                        </div>
                                        <div class="reviews-offer line-right-info">
                                            ${reviews}
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom-info-offer">
                                    <p class="rating">Rating <span class="rating-number">${ad.rating}</span>/5</p>
                                    <button class="add-comment comments-button">Add comment</button>
                                    <button class="more-comments comments-button">More comments</button>
                                </div>
            `;
        return offer;
    }
    showAds(){

        let firstButton = document.querySelector(".offers-list .button-load-more:last-child");
        document.querySelectorAll(".offer").forEach( offer => offer.remove());
        this.ads.getPage().forEach( ad => {
            firstButton.before(this._getOffer(ad));
        });
    }

    addAd(ad){
        if (this.ads.add(ad)){
            this.showAds();
            return true;
        }
    }
}

let view = new View([
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
                    ]);

view.showAds();

setTimeout(function(){view.addAd({
                                     id: '21',
                                     description : 'Скидка на столы - до 89%',
                                     createdAt : new Date('2023-01-29T20:12:32'),
                                     link : 'https://coolTables.ua',
                                     vendor : 'Table service',
                                     photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
                                     hashTags : ['Table', 'furniture', 'wood'] ,
                                     discount : '89',
                                     validUntil : new Date('2023-01-21T20:12:32'),
                                     rating : 4,
                                     reviews : ['Эти столы прекрасны!'] ,
                                 }
                                 )}, 5000);

