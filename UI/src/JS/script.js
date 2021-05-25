class View{
    _ads;
    _tmpAd;
    _username;
    _isVendor;
    constructor(adList, username, isVendor){
        this._ads = new AdsList(adList);
        this._tmpAd = document.querySelector(".offer-tmp");
        this._username = username;
        this._isVendor = isVendor;
    }
    showUser(){
        if(this._username == null || this._username.length == 0){
            document.querySelector(".profile").textContent = "Log in";
            document.querySelector(".log-out").style.visibility = "hidden";
        }
        else {
            document.querySelector(".profile").textContent = this._username;
            document.querySelector(".log-out").style.visibility = "visible";
        }
    }
    _showButtons(template){
        if(this._username == null || this._username.length == 0){
            template.querySelectorAll(".button-offer").forEach(button => button.style.visibility = "hidden");
            template.querySelector(".add-comment").style.visibility = "hidden";
        }
        else if (this._isVendor == true) {
            template.querySelector(".add-comment").style.visibility = "hidden";
        }
        else {
            template.querySelectorAll(".button-offer").forEach(button => button.style.visibility = "hidden");
        }
    }
    _showReviews(template, ad){
        let reviewsTmp = template.querySelector(".reviews-offer");
        template.querySelectorAll(".review").forEach(rev => rev.remove());
        ad.reviews.forEach(review => {
            let review1 = document.createElement('span');
            review1.className = "review";
            review1.textContent = review;
            reviewsTmp.append(review1);
        });
    }
    _buildOffer(ad){
        let template = document.importNode(this._tmpAd, true);
        template.querySelector(".image-in-offer").setAttribute('src', ad.photoLink);
        template.querySelector(".percent").textContent = ad.discount + "%";
        template.querySelector(".date-expiration").textContent = ad.validUntil.getFullYear() + " " + (ad.validUntil.getMonth() + 1) + " " + ad.validUntil.getDate();
        template.querySelector(".offer-label").textContent = ad.label;
        template.querySelector(".seller-name").textContent = ad.vendor;
        template.querySelector(".seller-link").setAttribute("href", ad.link);
        this._showButtons(template);
        template.querySelector(".description-offer").textContent = ad.description;
        template.querySelector(".rating-number").textContent = ad.rating;
        let hashtagsTmp = template.querySelector(".hashtags-offer");
        template.querySelectorAll(".tag").forEach(tag => tag.remove());
        ad.hashTags.forEach(tag => {
            let hashtag = document.createElement('span');
            hashtag.className = "tag";
            hashtag.textContent = "#" + tag;
            hashtagsTmp.append(hashtag);
        });
        this._showReviews(template, ad);
        return template;
    }

    showAds(){
        let secondButton = document.querySelector(".offers-list .button-load-more:last-child");
        document.querySelectorAll(".offer-tmp").forEach( offer => offer.remove());
        this._ads.getPage().forEach( ad => {
            secondButton.before(this._buildOffer(ad));
        });
    }

    addAd(ad){
        if (this._ads.add(ad)){
            this.showAds();
            return true;
        }
        return false;
    }

    editAd(id, ad){
        if(this._ads.edit(id, ad)){
            this.showAds();
            return true;
        }
        return false;
    }
}

let view = new View([
                        {
                            id: '1',
                            description : 'Скидка на шкафы - до 79%',
                            label: 'Скидка на шкафы',
                            createdAt : new Date('2021-01-21T20:12:32'),
                            link : 'https://coollockers.ua',
                            vendor : 'Locker service',
                            photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
                            hashTags : ['locker', 'furniture', 'wood'] ,
                            discount : '79',
                            validUntil : new Date('2022-01-21T20:12:32'),
                            rating : 3,
                            reviews : ['Эти шкафы прекрасны!', "Your shop is trash!"] ,
                        },
                        {
                            id: '2',
                            description : 'Скидка на столы - до 73%',
                            label: 'Скидка на слолы',
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
                            label: 'Скидка на шкафы',
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
                            label: 'Скидка на столы',
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
                            label: 'Скидка на шкафы',
                            createdAt : new Date('2021-01-28T20:12:32'),
                            link : 'https://coollockers.ua',
                            vendor : 'Locker service',
                            photoLink : 'https://secure.img1-fg.wfcdn.com/im/30366256/compr-r85/8605/8605454/all-wood-club-2-tier-3-wide-gym-locker.jpg',
                            hashTags : ['locker', 'furniture', 'wood'] ,
                            discount : '2',
                            validUntil : new Date('2022-02-21T20:12:32'),
                            rating : 2,
                            reviews : ['Эти шкафы прекрасны!'] ,
                        }
    ], "Alex popovich" , false);

function showPage(){
view.showUser();
view.showAds();
}

function addAd(){
view.addAd({
            id: '21',
            description : 'Скидка на столы - до 89%',
            label: 'Skidka na tabels',
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
        );
}

showPage();