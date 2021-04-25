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

class View{
    _ads;
    _tmpAd;
    _username;
    _isVendor;
    //_filterBlock;
    //_offesListBlock;
    _mainPage;
    constructor(adList, username, isVendor){
        this._ads = new AdsList(adList);
        this._tmpAd = document.querySelector(".offer-tmp");
        this._mainPage = document.querySelector(".main-page");
        //this._filterBlock = document.querySelector(".filters-box");
        //this._offesListBlock = document.querySelector(".offers-list");
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
    _getOffer(ad){
        let template = document.importNode(this._tmpAd, true);
        template.querySelector(".image-in-offer").setAttribute('src', ad.photoLink);
        template.querySelector(".percent").textContent = ad.discount + "%";
        template.querySelector(".date-expiration").textContent = ad.validUntil.getFullYear() + " " + (ad.validUntil.getMonth() + 1) + " " + ad.validUntil.getDate();
        template.querySelector(".offer-label").textContent = ad.label;
        template.querySelector(".seller-name").textContent = ad.vendor;
        template.querySelector(".seller-link").setAttribute("href", ad.link);
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
        let reviewsTmp = template.querySelector(".reviews-offer");
        template.querySelectorAll(".review").forEach(rev => rev.remove());
        ad.reviews.forEach(review => {
            let review1 = document.createElement('span');
            review1.className = "review";
            review1.textContent = review;
            reviewsTmp.append(review1);
        });
        return template;
    }
    showAds(skip = 0, top = 10, filterConfig = undefined){
        let secondButton = document.querySelector(".offers-list .button-load-more:last-child");
        if (secondButton != null){
            document.querySelectorAll(".offer-tmp").forEach( offer => offer.remove());

            this._ads.getPage(skip, top, filterConfig).forEach( ad => {
                secondButton.before(this._getOffer(ad));
            });
            if (this._ads.getFilteredSize(skip, filterConfig) <= top) {
                secondButton.style.visibility = 'hidden';
            }
            else {
                secondButton.style.visibility = 'visible';
            }
        }
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
    showAll(skip = 0, top = 10, filterConfig = undefined){
        this.showUser();
        this.showAds(skip, top, filterConfig);
    }
    getAllAds(){
        return this._adList.getAllAds();
    }

    getAuthorisationPage(){
        return `
            <p class="info-text">Enter your login and password</p>
            <form class='log-in-form'>
                <input type="text" name="loginInput" class="login-input log-in-input" placeholder="Login">
                <input type="text" name="passwordInput" class="password-input log-in-input" placeholder="Password">
                <button class="sign-in-button log-in-input">Sign in</button>
            </form>
        `;
    }

    logInOutClicked(){
        if (this._username != ''){
            this._username = '';
            this._isVendor = false;
        }else {
            //this._offesListBlock.remove();
            //this._filterBlock.remove();
            //this._mainPage.remove();
            document.querySelector(".main-page").remove();
            let newMain = document.createElement("main");
            newMain.className = "log-in-main-page main-page";
            newMain.innerHTML = this.getAuthorisationPage();
            document.querySelector('.header').after(newMain);
        }
    }

    siteNameClicked(){
        document.querySelector(".main-page").remove();
        document.querySelector(".header").after(this._mainPage);
    }
    setUserName(username){
        this._username = username;
    }
    setVendor(isVendor){
        this._isVendor = isVendor;
    }
}






window.onload = function(){

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
            hashTags : [ 'furniture', 'wood'] ,
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
], "" , true);


    let filterConfig = {};
    let skip = 0;
    let top = 1;
    view.showAll(skip, top, filterConfig);
    
    document.querySelector(".filters-box").addEventListener('change', handleFilter);

    function handleFilter(event){
        let filter = event.target.parentNode;
        filterConfig.dateFrom = filter.elements.dateFilter.value;
        filterConfig.vendor = filter.elements.nameFilter.value;
        if (filter.elements.hashtagFilter.value.length != 0) {
            filterConfig.hashTags = filter.elements.hashtagFilter.value.split(' ');
        }
        else {
            filterConfig.hashTags = [];
        }
        top = 1;
        view.showAll(skip, top, filterConfig);
    }

    document.querySelector(".button-load-more").addEventListener('click', handleAddMore);
    function handleAddMore(){
        top += 1;
        view.showAll(skip, top, filterConfig);
    }

    document.querySelector(".name-and-sign-out").addEventListener('click', handleLogInOut);
    function handleLogInOut(){
        view.logInOutClicked();
        if (document.querySelector(".log-in-main-page") != null){
            document.querySelector(".sign-in-button").addEventListener('click', handleSignInButton);
        }
        view.showAll(skip, top, filterConfig);
    }
    function handleSignInButton(event){
        let form = event.target.parentNode;
        if(form.elements.loginInput.value != '' && form.elements.passwordInput.value != ''){
            view.setUserName(form.elements.loginInput.value);
            view.setVendor(true);
            form.querySelector(".sign-in-button").removeEventListener('click', handleSignInButton);
            handleClickOnSiteName();
        }
    }
    document.querySelector(".site-name-button").addEventListener("click", handleClickOnSiteName);
    function handleClickOnSiteName(){
        view.siteNameClicked();
        view.showAll(skip, top, filterConfig);
    }
    
}

