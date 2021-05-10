class View{
    _ads;
    _tmpAd;
    _username;
    _isVendor;
    _mainPage;
    constructor(username, isVendor){
        this._ads = new AdsList();
        this._ads.restore();
        this._tmpAd = document.querySelector(".offer-tmp");
        this._mainPage = document.querySelector(".main-page");
        this._username = username;
        this._isVendor = isVendor;
    }
    showUser(){
        if(this._username == null || this._username.length == 0){
            document.querySelector(".profile").textContent = "Log in";
            document.querySelector(".log-out").style.visibility = "hidden";
            document.querySelector(".button-add-offer").style.visibility = "hidden";
        }
        else {
            document.querySelector(".profile").textContent = this._username;
            document.querySelector(".log-out").style.visibility = "visible";
            if(this._isVendor == true){
                document.querySelector(".button-add-offer").style.visibility = "visible";
            }
            else {
                document.querySelector(".button-add-offer").style.visibility = "hidden";
            }
        }
    }
    _showButtons(template){
        if(this._username == null || this._username.length == 0){
            template.querySelectorAll(".button-offer").forEach(button => button.style.visibility = "hidden");
            template.querySelectorAll(".add-comment").forEach(button => button.style.visibility = "hidden");
        }
        else if (this._isVendor == true) {
            template.querySelectorAll(".button-settings-offer").forEach(button => {
                if(button.closest('article').querySelector(".seller-name").textContent !== this._username){
                    button.style.visibility = "hidden";
                }
            });
            template.querySelectorAll(".button-delete-offer").forEach(button => {
                if(button.closest('article').querySelector(".seller-name").textContent !== this._username){
                    button.style.visibility = "hidden";
                }
            });
            template.querySelectorAll(".add-comment").forEach(button => button.style.visibility = "hidden");
        }
        else {
            template.querySelectorAll(".button-offer").forEach(button => {button.style.visibility = "hidden";});
            template.querySelectorAll(".add-comment").forEach(button => button.style.visibility = "visible");
        }
    }
    _showReviews(template, ad){
        let reviewsTmp = template.querySelector(".reviews-offer");
        template.querySelectorAll(".review").forEach(rev => rev.remove());
        ad.reviews.forEach(review => {
            let review1 = document.createElement('span');
            review1.className = "review";
            review1.textContent = review.text;
            reviewsTmp.append(review1);
        });
    }
    _buildOffer(ad){
        let template = document.importNode(this._tmpAd, true);
        template.setAttribute('offer-id', ad.id);
        template.querySelector(".image-in-offer").setAttribute('src', ad.photoLink);
        template.querySelector(".percent").textContent = ad.discount + "%";
        template.querySelector(".date-expiration").textContent = ad.validUntil.getFullYear() + " " + (ad.validUntil.getMonth() + 1) + " " + ad.validUntil.getDate();
        template.querySelector(".offer-label").textContent = ad.label;
        template.querySelector(".seller-name").textContent = ad.vendor;
        template.querySelector(".seller-link").setAttribute("href", ad.link);
        this._showButtons(template);
        template.querySelector(".description-offer").textContent = ad.description;
        template.querySelector(".rating-number").textContent = ad.rating.toFixed(1);
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
        return this._ads.add(ad);
    }

    editAd(id, ad){
        if(this._ads.edit(id, ad)){
            return true;
        }
        return false;
    }
    addReview(id, review){
        this._ads.addReview(id, review);
    }
    deleteAd(id){
        return this._ads.remove(id);
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
            <input type='text' id='label-input' class='input-add-offer' placeholder='Label'><label for="label-input" class='label-add-offer'>Enter your label</label>
            <input type='text' id='description-input' class='input-add-offer' placeholder='Description'><label for="description-input" class='label-add-offer'>Enter description</label>
            <input type='text' id='link-input' class='input-add-offer' placeholder='Link'><label for="link-input" class='label-add-offer'>Enter link to your website</label>
            <input type='text' id='hashtags-input' class='input-add-offer' placeholder='Hashtags'><label for="hashtags-input" class='label-add-offer'>Enter your hashtags</label>
            <input type='date' id='date-input' class='input-add-offer'><label for="date-input" class='label-add-offer'>Enter date of expiration</label>
            <input type='text' id='discount-input' class='input-add-offer' placeholder='Discount'><label for="discount-input" class='label-add-offer'>Enter your discount</label>
            <input type='text' id='photo-input' class='input-add-offer' placeholder='Link to your photo'><label for='photo-input' class='label-add-offer'> Enter link to your photo </label>
            <button type='submit' class='submit-add-offer'>Submit</Button>
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
    _getAddCommentPage(){
    return`
        <p class='info-text'>Add your review</p>
        <form class="add-comment-form" name="add-comment-form">
            <input type='text' name="reviewInput" class='review-input add-comment-input' placeholder='Your review'>
            <input type='number' name='ratingInput' class='rating-input add-comment-input' placeholder='1-5'>
            <label class"label-add-comment" for="ratingInput">Your rating</label>
            <button class='add-review-button add-comment-input' type='submit'>Add review</button>
        </form>
    `
    }
    addCommentClicked(){
        document.querySelector(".main-page").remove();
        let newMain = document.createElement("main");
        newMain.className = "add-comment-main-page main-page";
        newMain.innerHTML = this._getAddCommentPage();
        document.querySelector('.header').after(newMain);
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
    getUsername(){
        return this._username;
    }
}

function startLocalStorage(){
    if(localStorage.getItem("offersList") == null){
        let offersList = [
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
                         rating : 3.5,
                         reviews : [
                             {text:'Эти шкафы прекрасны!', rating:5},
                             {text:"Your shop is trash!", rating:2}
                             ],
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
                         reviews : [{text:'Эти столы прекрасны!', rating:4}] ,
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
                         reviews : [{text:'Эти шкафы прекрасны!', rating:2}] ,
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
                         reviews : [{text:'Эти столы прекрасны!', rating:4}] ,
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
                         reviews : [{text:'Эти шкафы ужасны!', rating:2}] ,
                     }
             ];
         localStorage.setItem("offersList", JSON.stringify(offersList));
    }
}

window.onload = function(){
    startLocalStorage();
    let view = new View("Pavel" , false);


    let filterConfig = {};
    let skip = 0;
    let top = 10;
    let editingId = 0;
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
        top = 10;
        view.showAll(skip, top, filterConfig);
    }

    function handleAddMore(){
        top += 10;
        view.showAll(skip, top, filterConfig);
    }
    function handleAddOffer(){
        view.addOfferClicked();
        if(document.querySelector(".add-offer-main-page") != null){
            document.forms[0].addEventListener('submit', handleSubmitAddOffer);
        }
    }
    function buildAddOffer(form){
        let newOffer = {};
        newOffer.id = (new Date()).getTime().toString();
        newOffer.label = form.elements["label-input"].value;
        newOffer.description = form.elements["description-input"].value;
        newOffer.link = form.elements["link-input"].value;
        newOffer.validUntil = new Date(form.elements["date-input"].value);
        newOffer.discount = form.elements["discount-input"].value;
        newOffer.photoLink = form.elements["photo-input"].value;
        newOffer.hashTags = form.elements["hashtags-input"].value.split(' ');
        newOffer.reviews = [];
        newOffer.createdAt = new Date();
        newOffer.vendor = view.getUsername();
        newOffer.rating = 5;
        return newOffer;
    }
    function handleSubmitAddOffer(){
        event.preventDefault();
        let form = event.target;
        let valid = true;
        for(let element in form.elements){
            if(form.elements[element].value == '' && form.elements[element].type != 'submit'){
                valid = false;
            }
        }
        if(!valid){
            if(form.querySelector('.alert-wrong-data') == null){
                let newParagraph = document.createElement('p');
                newParagraph.className = 'alert-wrong-data';
                newParagraph.textContent = "fields can't be empty!";
                newParagraph.style.marginBottom = '1rem';
                form.querySelector(".submit-add-offer").after(newParagraph);
            }
        }
        else {
            view.addAd(buildAddOffer(form));
            handleClickOnSiteName();
        }

    }
    document.querySelector(".name-and-sign-out").addEventListener('click', handleLogInOut);
    function handleLogInOut(){
        view.logInOutClicked();
        if (document.querySelector(".log-in-main-page") != null){
            document.forms[0].addEventListener('submit', handleSignInButton);
        }else {
            handleClickOnSiteName();
        }
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
                newParagraph.style.marginBottom = '1rem';
                form.querySelector(".sign-in-button").after(newParagraph);
            }
        }
    }
    document.querySelector(".site-name-button").addEventListener("click", handleClickOnSiteName);
    function handleClickOnSiteName(){
        view.siteNameClicked();
        view.showAll(skip, top, filterConfig);
    }
    document.querySelector(".offers-list").addEventListener("click", handleClickOnOffers);
    function deleteOffer(button){
        let id = button.closest('article').getAttribute('offer-id');
        view.deleteAd(id);
        view.showAll(skip, top, filterConfig);
    }
    function handleSubmitEditOffer(){
        event.preventDefault();

        let form = event.target;
        let newOffer = {};
        newOffer.label = form.elements["label-input"].value;
        newOffer.description = form.elements["description-input"].value;
        newOffer.link = form.elements["link-input"].value;
        if(form.elements["date-input"].value !== ''){
            newOffer.validUntil = new Date(form.elements["date-input"].value);
        }
        newOffer.discount = form.elements["discount-input"].value;
        newOffer.photoLink = form.elements["photo-input"].value;
        if(form.elements["hashtags-input"].value !== ''){
            newOffer.hashTags = form.elements["hashtags-input"].value.split(' ');
        }
        view.editAd(editingId, newOffer);
        handleClickOnSiteName();
    }
    function editOffer(button){
        editingId = event.target.closest('article').getAttribute('offer-id');
        view.addOfferClicked();
        if(document.querySelector(".add-offer-main-page") != null){
            document.forms[0].addEventListener('submit', handleSubmitEditOffer);
        }
    }
    function handleSubmitAddComment(){
        event.preventDefault();
        let form = event.target;
        let review = {}
        if(form.elements.reviewInput.value != '' && form.elements.ratingInput.value != ''){
            review.text = form.elements.reviewInput.value;
            review.rating = parseInt(form.elements.ratingInput.value);
            if(review.rating > 5 || review.rating < 1){
                if(form.querySelector('.alert-wrong-data') != null){
                    form.querySelector('.alert-wrong-data').remove();
                }
                let newParagraph = document.createElement('p');
                newParagraph.className = 'alert-wrong-data';
                newParagraph.textContent = "rating must be 1-5!";
                newParagraph.style.marginBottom = '1rem';
                form.querySelector(".add-review-button").after(newParagraph);
            }
            else {
                view.addReview(editingId, review);
                handleClickOnSiteName();
            }
        }
        else {
                if(form.querySelector('.alert-wrong-data') != null){
                    form.querySelector('.alert-wrong-data').remove();
                }
                let newParagraph = document.createElement('p');
                newParagraph.className = 'alert-wrong-data';
                newParagraph.textContent = "fields can't be empty!";
                newParagraph.style.marginBottom = '1rem';
                form.querySelector(".add-review-button").after(newParagraph);

        }
    }
    function addComment(button){
        editingId = event.target.closest('article').getAttribute('offer-id');
        view.addCommentClicked();
        if(document.querySelector(".add-comment-main-page") != null){
            document.forms[0].addEventListener('submit', handleSubmitAddComment);
        }
    }
    function handleClickOnOffers(){
        let button = event.target.closest('button');
        if(button != null){
            if(button.id === 'editOffer'){
                editOffer(button);

            }
            else if(button.id === 'deleteOffer'){
                deleteOffer(button);
            }
            else if(button.id === 'addCommentOffer'){
                addComment(button);
            }
            else if(button.id === 'addOffers'){
                handleAddOffer();
            }
            else if(button.id === 'loadMore'){
                handleAddMore();
            }

        }

    }

}

