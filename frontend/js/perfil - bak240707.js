import config from '../config.js';
//import { isUserLoggedIn, validateTokenWithBackend, checkUserSession } from './auth.js';

(() => {
  const App = {
    htmlElements: {
      form: document.getElementById("profileForm"),
      photoInput: document.getElementById("photoInput"),
      photoPreview: document.getElementById("photoPreview"),
      chooseImageBtn: document.getElementById("chooseImage"),
      removeImageBtn: document.getElementById("removeImage"),
      saveButton: document.getElementById("saveButton"),
      cancelButton: document.getElementById("cancelButton"),
    },
  
    init() {
      this.bindEvents();
      this.loadUserProfile();
    },
  
    bindEvents() {
      this.htmlElements.chooseImageBtn.addEventListener("click", this.handlers.onChooseImage);
      this.htmlElements.removeImageBtn.addEventListener("click", this.handlers.onRemoveImage);
      this.htmlElements.photoInput.addEventListener("change", this.handlers.onPhotoSelected);
      this.htmlElements.form.addEventListener("submit", this.handlers.onSubmitForm);
      this.htmlElements.cancelButton.addEventListener("click", this.handlers.onCancel);
    },
  
    handlers: {
      onChooseImage(event) {
        App.htmlElements.photoInput.click();
      },
  
      onRemoveImage(event) {
        App.htmlElements.photoPreview.src = "placeholder-image.png";
        App.htmlElements.photoInput.value = "";
      },
  
      onPhotoSelected(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            App.htmlElements.photoPreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
  
      async onSubmitForm(event) {
        event.preventDefault();
        if (App.validateForm()) {
          try {
            //console.log(App.htmlElements.form.getElementById('apellido').value)
            const formData = new FormData(App.htmlElements.form);
            //envia a console log formData
            //console.log(formData);
            formData.forEach((value, key) => {
              console.log(key, value);
            });
            // Añadir la foto si se ha seleccionado una nueva
            if (App.htmlElements.photoInput.files[0]) {
              formData.append('photo', App.htmlElements.photoInput.files[0]);
            }
            // update perfil del usuario
            //`${config.API_BASE_URL}/api/users/profile`
            //const response = await fetch('http://localhost:3000/api/users/profileupdate', {
            const response = await fetch(`${config.API_BASE_URL}/api/users/profileUpdate`, {
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
              }
            });
  
            if (!response.ok) {
              throw new Error('Failed to update profile');
            }
  
            const result = await response.json();
            alert('Profile updated successfully');


          } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
          }
        }
      },
  
      onCancel(event) {
        // Redirect to previous page or dashboard
        window.history.back();
      }
    },
  
    validateForm() {
      // Add your validation logic here
      // Return true if valid, false otherwise
      const requiredFields = ['nombre', 'apellido', 'email', 'numerodecelular'];
      for (let field of requiredFields) {
        if (!this.htmlElements.form[field].value.trim()) {
          alert(`${field} is required`);
          return false;
        }
      }
      // Add more specific validations as needed
      return true;
    },
  
    async loadUserProfile() {
      try {
        //`${config.API_BASE_URL}/api/users/profile`
        //const response = await fetch('http://localhost:3000/api/users/profile', {
        const response = await fetch(`${config.API_BASE_URL}/api/users/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
  
        const profile = await response.json();
        this.populateForm(profile);
      } catch (error) {
        console.error('Error loading user profile:', error);
        alert('Failed to load user profile');
      }
    },
  
    populateForm(profile) {
      for (let key in profile) {
        if (this.htmlElements.form[key]) {
          this.htmlElements.form[key].value = profile[key];
        }
      }
      if (profile.photoUrl) {
        this.htmlElements.photoPreview.src = profile.photoUrl;
      }
    }
  };
  App.init();
})();

