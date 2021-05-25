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
    if(localStorage.getItem("username") == null){
        localStorage.setItem("username", '');
        localStorage.setItem("isVendor", false);
    }
}

window.onload = function(){
    startLocalStorage();
    let view = new View();


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
            view.saveUser();
            form.querySelector(".sign-in-button").removeEventListener('click', handleSignInButton);
            handleClickOnSiteName();
            return;
        }
        if(form.querySelector('.alert-wrong-data') == null){
            let newParagraph = document.createElement('p');
            newParagraph.className = 'alert-wrong-data';
            newParagraph.textContent = "fields can't be empty!";
            newParagraph.style.marginBottom = '1rem';
            form.querySelector(".sign-in-button").after(newParagraph);
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
    function editOffer(){
        editingId = event.target.closest('article').getAttribute('offer-id');
        view.editOfferClicked(editingId);
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
        if(!button){
            return;
        }
        if(button.id === 'editOffer'){
            editOffer(button);
            return;
        }
        if(button.id === 'deleteOffer'){
            deleteOffer(button);
            return;
        }
        if(button.id === 'addCommentOffer'){
            addComment(button);
            return;
        }
        if(button.id === 'addOffers'){
            handleAddOffer();
            return;
        }
        if(button.id === 'loadMore'){
            handleAddMore();
        }

    }

}

