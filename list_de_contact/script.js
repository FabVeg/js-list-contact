'use strict';

/*global getLocalStorage, setLocalStorage*/

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

const STORAGE_NAME = 'address_book';
var addContact_form, contactInfos;
var  contactDetails, saveContact, toolbar, firstName, lastName, phone, addContact, contactForm, title;

contactDetails = document.getElementById('contact-details');
saveContact = document.getElementById('save-contact');
toolbar = document.getElementById('toolbar');
firstName = document.getElementById('firstName');
lastName = document.getElementById('lastName');
phone = document.getElementById('phone');
addContact = document.getElementById('add-contact');
contactForm = document.getElementById('contact-form');
title = document.getElementById('title')


/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/


/* ************************************* afficher le form ************************************ */

function removeClassHidden() {
    
    contactDetails.classList.remove('hidden');
    contactForm.classList.remove('hidden');
}



function onSubmitAddContactForm(event) {
    
    var contact;
    
    event.preventDefault();

    contact = formatContact(
        this.title.value,
        this.firstname.value,
        this.lastname.value,
        this.phone.value
    );

    editContact(contact, parseInt(this.dataset.index));

    addContact_form.classList.add('hidden');

    this.reset();

    displayContacts();
} 


function formatContact(title, firstname, lastname, phone){
    
    return  {
        title: title,
        firstname: firstname,
        lastname: lastname,
        phone: phone
    };

};

/* ************************************* afficher les contacts au - dessus ************************************ */
 
var getTitle = function(title){
    switch (title) {
        case 1:
            return "Madame";
        case 2:
            return "Mademoiselle";
        case 3:
            return "Monsieur";
    }
};
 
 
function fullName(contact) {
    
    return getTitle(contact.title) +  ' ' + contact.firstname +  ' ' + contact.lastname;
    
}



var editContact = function(contact, contactIndex){


    var addressBook = getLocalStorage(STORAGE_NAME);

    if(!isNaN(contactIndex)){
        
        addressBook[contactIndex] = contact;
    } else {
       
        addressBook.push(contact);
    }


    setLocalStorage(STORAGE_NAME, addressBook);


};




var getContact = function(contactIndex){

    var contacts = getLocalStorage(STORAGE_NAME);

   
    return contacts[parseInt(contactIndex)];
};


var deleteContact = function(contactIndex){
 
 
    var addressBook = getLocalStorage(STORAGE_NAME);

    addressBook.splice( contactIndex , 1 );


    setLocalStorage(STORAGE_NAME, addressBook);
};


var editContact = function(contact, contactIndex){

    
    var addressBook = getLocalStorage(STORAGE_NAME);

    if(!isNaN(contactIndex)){
        
        addressBook[contactIndex] = contact;
    } else {
        
        addressBook.push(contact);
    }

    
    setLocalStorage(STORAGE_NAME, addressBook);

};




var displayContacts = function(){
    
    var ul;
    var index;
    var contact;

 
    var contacts = getLocalStorage(STORAGE_NAME);

    ul ="";

  
    for( index = 0; index < contacts.length; index ++){
        contact = contacts[index];
        ul += '<li><a href="#" data-index="'+ index +'" title="afficher le contact"">'+fullName(contact)+'</a></li>';
        
    }
}


/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/



//ecouteur d'évenement qui attend le clique sur lien
addContact.addEventListener('click',removeClassHidden);

