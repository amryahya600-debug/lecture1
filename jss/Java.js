var fullNameElement = document.getElementById('fullName');
var phoneNumberElement = document.getElementById('phoneNumber');
var emailAddressElement = document.getElementById('emailAddress');
var address = document.getElementById('address');
var group = document.getElementById('group');
var notes = document.getElementById('notes');
var isFavorite = document.getElementById('isFavorite');
var isEmergency = document.getElementById('isEmergency');

var totalContactsElement = document.getElementById('totalContacts');
var contactsCountElement = document.getElementById('contactsCount');
var favoritesCountElement = document.getElementById('favoritesCount');
var emergencyCountElement = document.getElementById('emergencyCount');

var rowData = document.getElementById('rowData');

var emergencyList = document.getElementById('emergencyList');
var favoritesList = document.getElementById('favoritesList');


var modal = document.getElementById('addContactModal');


var saveContactBtn = document.getElementById('saveContactBtn');
var updateContactBtn = document.getElementById('updateContactBtn');

var searchInput = document.getElementById('searchInput');



var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
displayContacts(contacts);


function saveContact() {


  var newContact = {
    id: Date.now(),
    fullName: fullNameElement.value,
    phoneNumber: phoneNumberElement.value,
    emailAddress: emailAddressElement.value,
    address: addressElement.value,
    notes: notesElement.value,
    group: groupElement.value,
    isFavorite: isFavoriteElement.checked,
    isEmergency: isEmergencyElement.checked
  };

  contacts.push(newContact);
  // localstorage
  saveToLocalStorage(contacts);

  Swal.fire({
    title: "Contact Saved!",
    icon: "success"
  });

  closeModal();

  displayContacts(contacts);

  console.log(contacts);


}

// clear form
function clearForm() {
  fullNameElement.value = '';
  phoneNumberElement.value = '';
  emailAddressElement.value = '';
  addressElement.value = '';
  notesElement.value = '';
  groupElement.value = '';
  isFavoriteElement.checked = false;
  isEmergencyElement.checked = false;
}


function closeModal() {
  clearForm();
  var modalDiv = bootstrap.Modal.getInstance(modal);
  modalDiv.hide();

}

function saveToLocalStorage(data) {
  localStorage.setItem('contacts', JSON.stringify(data));
}




function displayContacts(data) {

  totalContactsElement.innerHTML = contacts.length;
  contactsCountElement.innerHTML = contacts.length;
  var favCout = 0, emergCount = 0;

  if (data.length === 0) {
    rowData.innerHTML = `  <p class="alert alert-danger text-center">No contacts found</p> `;

    return;
  }

  var box = ""
  var favBox = "";
  var emergBox = "";
  for (var i = 0; i < data.length; i++) {
    box += `
        <div class="col-md-6">

              <div class="contact-card">
                <div class="contact-header">
                  <div class="contact-avatar ${data[i].isFavorite && " favorite"} ${data[i].isEmergency && " emergency"} bg-danger">
                    ${data[i].fullName.split(' ')[0][0]}
                  </div>
                  <div class="contact-info">
                    <h4>${data[i].fullName}</h4>
                  </div>
                </div>
                <div class="contact-details">
                  <div class="contact-detail phone">
                    <i class="fas fa-phone"></i>
                    <span>${data[i].phoneNumber}</span>
                  </div>
                  <div class="contact-detail email">
                    <i class="fas fa-envelope"></i>
                    <span>${data[i].emailAddress}</span>
                  </div>
                  <div class="contact-detail address">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${data[i].address}</span>
                  </div>
                </div>
                <div class="contact-tags">
                  <span class="tag ${data[i].group}">${data[i].group}</span>
                  ${data[i].isEmergency ? '<span class="tag emergency"><i class="fas fa-heartbeat"></i> Emergency</span>' : ''}
                  ${data[i].isFavorite ? '<span class="tag favorites"><i class="fas fa-heartbeat"></i> favorite</span>' : ''}
                </div>
                <div class="contact-actions">
                  <a class="contact-action call" title="Call" href="tel:${data[i].phoneNumber}">
                    <i class="fas fa-phone"></i>
                  </a>
                  <a class="contact-action email" title="Email" href="mailto:${data[i].emailAddress}">
                    <i class="fas fa-envelope"></i>
                  </a>
                  <button class="contact-action ${data[i].isFavorite && " active"} favorite" title="Favorite">
                    <i class="far fa-star"></i>
                  </button>
                  <button class="contact-action ${data[i].isEmergency && " active"} emergency" title="Emergency">
                    <i class="far fa-heart"></i>
                  </button>
                  <button
                   data-bs-toggle="modal"
            data-bs-target="#addContactModal"
                  class="contact-action" title="Edit" onclick="getContactForUpdate(${data[i].id})">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onclick="deleteContact(${data[i].id})" class="contact-action delete" title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>



                  </div>
        `

    if (data[i].isFavorite) {
      favBox += `
             <div class="sidebar-contact-card">
                  <div class="sidebar-contact-avatar" style="background: #3b82f6">
                    ${data[i].fullName.split(' ')[0][0]}
                  </div>
                  <div class="sidebar-contact-info">
                    <h5>Stephanie Gaines</h5>
                    <p>${data[i].phoneNumber}</p>
                  </div>
                  <a class="sidebar-call-btn favorites-call" href="tel:${data[i].phoneNumber}">
                    <i class="fas fa-phone"></i>
                  </a>
                </div>
            ` ;
    }
    if (data[i].isEmergency) {
      emergBox += `
            <div class="sidebar-contact-card">
                  <div class="sidebar-contact-avatar" style="background: #3b82f6">
                    ${data[i].fullName.split(' ')[0][0]}
                  </div>
                  <div class="sidebar-contact-info">
                    <h5>Stephanie Gaines</h5>
                    <p>${data[i].phoneNumber}</p>
                  </div>
                  <a class="sidebar-call-btn favorites-call" href="tel:${data[i].phoneNumber}">
                    <i class="fas fa-phone"></i>
                  </a>
                </div>
            ` ;
    }

    if (data[i].isFavorite) {
      favCout++;
    }
    if (data[i].isEmergency) {
      emergCount++;
    }
  }

  rowData.innerHTML = box;
  favoritesList.innerHTML = favBox;
  emergencyList.innerHTML = emergBox;

  favoritesCountElement.innerHTML = favCout;
  emergencyCountElement.innerHTML = emergCount;





}



function deleteContact(index) {

  Swal.fire({
    title: "Are you sure u want to delete this contact?",

    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#10b981",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].id === index) {
          contacts.splice(i, 1);
          break;
        }

      }

      saveToLocalStorage(contacts);
      displayContacts(contacts);

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });


}


var updateId = -1;

function getContactForUpdate(index) {

  updateId = index;
  var currentContact = null;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].id === updateId) {
      currentContact = i;
      break;
    }
  }
  fullNameElement.value = contacts[currentContact].fullName;
  phoneNumberElement.value = contacts[currentContact].phoneNumber;
  emailAddressElement.value = contacts[currentContact].emailAddress;
  groupElement.value = contacts[currentContact].group;
  notesElement.value = contacts[currentContact].notes;
  addressElement.value = contacts[currentContact].address;


  isFavoriteElement.checked = contacts[currentContact].isFavorite;
  isEmergencyElement.checked = contacts[currentContact].isEmergency;

  saveContactBtn.classList.add('d-none');
  updateContactBtn.classList.remove('d-none');


}


function updateContact() {
  var updatedContact = {
    fullName: fullNameElement.value,
    phoneNumber: phoneNumberElement.value,
    emailAddress: emailAddressElement.value,
    group: groupElement.value,
    notes: notesElement.value,
    address: addressElement.value,
    isFavorite: isFavoriteElement.checked,
    isEmergency: isEmergencyElement.checked
  };


  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].id === updateId) {
      contacts[i] = { ...contacts[i], ...updatedContact };
      break;
    }

  }
  saveToLocalStorage(contacts);
  displayContacts(contacts);

  saveContactBtn.classList.add('d-none');
  updateContactBtn.classList.remove('d-none');
  closeModal();

  Swal.fire({
    title: "Updated!",
    text: "Your contact has been updated.",
    icon: "success"
  });



}


function searchContacts(input) {
  setTimeout(() => {
    var filterdData = []
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].fullName.toLowerCase().includes(input.toLowerCase()) || contacts[i].phoneNumber.includes(input) ||
        contacts[i].emailAddress.toLowerCase().includes(input.toLowerCase())) {
        filterdData.push(contacts[i]);
      }
    }
    displayContacts(filterdData);

  }, 1000);

}



