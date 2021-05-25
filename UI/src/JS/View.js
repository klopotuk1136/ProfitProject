class View{
    _ads;
    _tmpAd;
    _username;
    _isVendor;
    _mainPage;
    constructor(){
        this._ads = new AdsList();
        this._ads.restore();
        this._tmpAd = document.querySelector(".offer-tmp");
        this._mainPage = document.querySelector(".main-page");
        this.restoreUser();
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
                else {
                    button.style.visibility = "visible";
                }
            });
            template.querySelectorAll(".button-delete-offer").forEach(button => {
                if(button.closest('article').querySelector(".seller-name").textContent !== this._username){
                    button.style.visibility = "hidden";
                }
                else {
                    button.style.visibility = "visible";
                }
            });
            template.querySelectorAll(".add-comment").forEach(button => {
                if(button.closest('article').querySelector(".seller-name").textContent === this._username){
                    button.style.visibility = "hidden";
                }
                else {
                    button.style.visibility = "visible";
                }
            });
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

    _fillEditOfferPage( offerId){
        let offer = this._ads.get(offerId);
        document.getElementById("label-input").setAttribute("value", offer.label);
        document.getElementById("description-input").setAttribute("value", offer.description);
        document.getElementById("link-input").setAttribute("value", offer.link);
        document.getElementById("hashtags-input").setAttribute("value", offer.hashTags.join(' '));
        document.getElementById("discount-input").setAttribute("value", offer.discount);
        document.getElementById("photo-input").setAttribute("value", offer.photoLink);
    }

    editOfferClicked(editingId){
        document.querySelector(".main-page").remove();
        let newMain = document.createElement("main");
        newMain.className = "add-offer-main-page main-page";
        newMain.innerHTML = this._getAddOfferPage();
        document.querySelector('.header').after(newMain);
        this._fillEditOfferPage(editingId);
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
            this.saveUser();
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
    saveUser(){
        localStorage.setItem("username", this._username);
        localStorage.setItem("isVendor", this._isVendor);
    }
    restoreUser(){
        if(localStorage.getItem("username") != null){
            this._username = localStorage.getItem("username");
            this._isVendor = JSON.parse(localStorage.getItem("isVendor"));
        }
        else {
            this._username = '';
            this._isVendor = false;
        }
    }
}