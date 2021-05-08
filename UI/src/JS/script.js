class View{
    _ads;
    _tmpAd;
    _username;
    _isVendor;
    _mainPage;
    constructor(adList, username, isVendor){
        this._ads = new AdsList(adList);
        this._tmpAd = document.querySelector(".offer-tmp");
        this._mainPage = document.querySelector(".main-page");
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
    showAds(skip = 0, top = 10, filterConfig = undefined){
        let secondButton = document.querySelector(".offers-list .button-load-more:last-child");
        if (secondButton != null){
            document.querySelectorAll(".offer-tmp").forEach( offer => offer.remove());

            this._ads.getPage(skip, top, filterConfig).forEach( ad => {
                secondButton.before(this._buildOffer(ad));
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

    _getAddOfferPage(){
        return `
        <form class='add-offer-form' name='add-offer-form'>
            <input type='text' id='label-input' class='input-add-offer' placeholder='Label'><label for="label-input">Enter your label</label>
            <input type='text' id='description-input' class='input-add-offer' placeholder='Description'><label for="description-input">Enter description</label>
            <input type='text' id='link-input' class='input-add-offer' placeholder='Link'><label for="link-input">Enter link to your website</label>
            <input type='text' id='hashtags-input' class='input-add-offer' placeholder='Hashtags'><label for="hashtags-input">Enter your hashtags</label>
            <input type='date' id='date-input' class='input-add-offer'><label for="label-input">Enter date of expiration</label>
            <input type='text' id='discount-input' class='input-add-offer' placeholder='Discount'><label for="hashtags-input">Enter your discount</label>
            <button type='submit'>Submit</Button>

        </form>
        `
    }
    addOfferClicked(){
        document.querySelector(".main-page").remove();
        let newMain = document.createElement("main");
        newMain.className = "add-offer-main-page main-page";
        newMain.innerHTML = this._getAddOfferPage();
        document.querySelector('.header').after(newMain);
    }
    _getAuthorisationPage(){
        return `
            <p class="info-text">Enter your login and password</p>
            <form class='log-in-form' name='log-in-form'>
                <input type="text" name="loginInput" class="login-input log-in-input" placeholder="Login">
                <input type="text" name="passwordInput" class="password-input log-in-input" placeholder="Password">
                <button class="sign-in-button log-in-input" type="submit">Sign in</button>
            </form>
        `;
    }
    logInOutClicked(){
        if (this._username != ''){
            this._username = '';
            this._isVendor = false;
        }else {
            document.querySelector(".main-page").remove();
            let newMain = document.createElement("main");
            newMain.className = "log-in-main-page main-page";
            newMain.innerHTML = this._getAuthorisationPage();
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
    document.querySelector(".button-add-offer").addEventListener('click', handleAddOffer);
    function handleAddOffer(){
        view.addOfferClicked();
    }
    document.querySelector(".name-and-sign-out").addEventListener('click', handleLogInOut);
    function handleLogInOut(){
        view.logInOutClicked();
        if (document.querySelector(".log-in-main-page") != null){
            document.forms[0].addEventListener('submit', handleSignInButton);
        }
        view.showAll(skip, top, filterConfig);
    }
    function handleSignInButton(event){
        event.preventDefault();
        let form = event.target;

        if(form.elements.loginInput.value != '' && form.elements.passwordInput.value != ''){
            view.setUserName(form.elements.loginInput.value);
            view.setVendor(true);
            form.querySelector(".sign-in-button").removeEventListener('click', handleSignInButton);
            handleClickOnSiteName();
        }else{
            if(form.querySelector('.alert-wrong-data') == null){
                let newParagraph = document.createElement('p');
                newParagraph.className = 'alert-wrong-data';
                newParagraph.textContent = "fields can't be empty!";
                form.querySelector(".sign-in-button").after(newParagraph);
            }
        }
    }
    document.querySelector(".site-name-button").addEventListener("click", handleClickOnSiteName);
    function handleClickOnSiteName(){
        view.siteNameClicked();
        view.showAll(skip, top, filterConfig);
    }
    
}

