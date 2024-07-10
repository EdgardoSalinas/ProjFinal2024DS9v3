import { isUserLoggedIn, validateTokenWithBackend, checkUserSession } from './auth.js';
(() => {
  // Obtener datos del usuario del almacenamiento local
  // const usuarioAutenticado = JSON.parse(localStorage.getItem('usuarioAutenticado'));
  const App = {
    htmlElements: {
      form: document.getElementById("formaprofileu"),
      btnClose: document.getElementById("btnClose"),
      btnEditar: document.getElementById("btnEditar"),
    },
    init() {
      App.bindEvents();
      App.methods.mostrarPerfil();
      // App.initialValiations();
    },
    // initialValiations() {
    //   Session.shouldNotBeLoggedIn();
    // },
    bindEvents() {
      App.htmlElements.btnClose.addEventListener(
        "click",
        App.handlers.onClickClose,
      );
      App.htmlElements.btnEditar.addEventListener(
        "click",
        App.handlers.onClickEditar,
      );

    },
    handlers: {
      onClickClose(event) {
        event.preventDefault();
        App.methods.hacerClose();
      },
      onClickEditar(event) {
        event.preventDefault();
        App.methods.hacerEdit();
      },
    },
    methods: {
      async mostrarPerfil() {
        const sesionValida = await checkUserSession();
        if (sesionValida) {
          try {
            const userProfile = await App.methods.fetchUserProfile();
            App.methods.renderUserProfile(userProfile);
          } catch (error) {
            this.handleAuthError();
          }
          // La redirección ya se maneja en checkUserSession, 
          // pero puedes agregar lógica adicional aquí si es necesario
        }
        else {
          // Redirigir a login.html si no hay usuario autenticado
          window.location.href = 'login.html';
        }
        // if (App.methods.usuarioAutenticado()) {
        //   const arrayUserAutenticado = App.methods.usuarioAutenticado();
        //   console.log(arrayUserAutenticado);
        //   const { nombre, nombrecompleto, descripcion, imagen, pais, email, celular} = App.methods.usuarioAutenticado();
        //   const profileContainer = document.getElementById('profileContainer');
        //   profileContainer.innerHTML = `
        //     <img src="${imagen}" alt="${nombre}" width="200" height="200">
        //     <h2>${nombrecompleto}</h2>
        //     <p>${email}</p>
        //     <p>${descripcion}</p>
        //     <p>Contacto:${celular}</p>
        //     <p>${pais}</p>           
        //   `;
        // } 
        // else {
        //   // Redirigir a login.html si no hay usuario autenticado
        //   window.location.href = 'login.html';
        // }
      },
      renderUserProfile(profile) {
        const profileElement = document.getElementById('profileContainer');
        profileElement.innerHTML = `
          <h1>Perfil del Usuario</h1>
          <form id="profileForm">
            <div class="photo-section">
              <h2>Foto</h2>
              <div class="photo-container">
                <img src="placeholder-image.png" alt="Foto de perfil" width="150" height="150">
                <p>Subir foto</p>
                <p>Formato en PNG o JPG</p>
                <button type="button" id="chooseImage">Choose image</button>
                <button type="button" id="removeImage">Remover</button>
              </div>
            </div>

            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Nombre">
            </div>

            <div class="form-group">
              <label for="apellido">Apellido</label>
              <input type="text" id="apellido" placeholder="Apellido">
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Your email">
            </div>

            <div class="form-group">
              <label for="celular">Numero de Celular</label>
              <input type="tel" id="celular" placeholder="Celular numero">
            </div>

            <div class="form-group">
              <label for="direccion">Direccion</label>
              <input type="text" id="direccion1" placeholder="Direccion1">
              <input type="text" id="direccion2" placeholder="Direccion2">
              <input type="text" id="direccion3" placeholder="Direccion3">
            </div>

            <div class="form-group">
              <label for="acerca-de-mi">Acerca de Mi</label>
              <textarea id="acerca-de-mi" placeholder="Algo Acerca de Usted"></textarea>
            </div>

            <div class="form-group">
              <label for="nombre-familiar">Nombre Completo Familiar</label>
              <input type="text" id="nombre-familiar" placeholder="Your full name">
            </div>

            <div class="form-group">
              <label for="edad-familiar">Edad Familiar</label>
              <input type="text" id="edad-familiar" placeholder="Edad Familiar">
            </div>

            <div class="form-group">
              <label for="direccion-familiar">Direccion del Familiar</label>
              <input type="text" id="direccion-familiar1" placeholder="Direccion1">
              <input type="text" id="direccion-familiar2" placeholder="Direccion2">
              <input type="text" id="direccion-familiar3" placeholder="Direccion3">
            </div>

            <div class="form-group">
              <label for="celular-familiar">Numero de Celular del familiar</label>
              <input type="tel" id="celular-familiar" placeholder="Celular numero">
            </div>

            <div class="form-group">
              <label for="enfermedades-familiar">Enfermedades del familair</label>
              <textarea id="enfermedades-familiar" placeholder="Algo Acerca de Usted"></textarea>
            </div>

            <div class="form-actions">
              <button type="button" id="cancelButton">Cancel</button>
              <button type="submit" id="saveButton">Save profile</button>
            </div>
          </form>
        `;
        // profileElement.innerHTML = `
        //   <h2>Bienvenido, ${profile.username}</h2>
        //   <p>Email: ${profile.email}</p>
        //   <p>Tipo de usuario: ${profile.type}</p>
        // `;
      },
 
      handleAuthError() {
        // Manejar error de autenticación
        console.error('Error de autenticación');
        // Redirigir al login o mostrar mensaje de error
      },

      usuarioAutenticado() {
        return JSON.parse(localStorage.getItem("usuarioAutenticado"));        
      },

      hacerClose(){
        //localStorage.removeItem("usuarioAutenticado");
        window.location.href = "index.html";
      },

      hacerEdit(){
        //localStorage.removeItem("usuarioAutenticado");
        window.location.href = "perfiledit.html";
      },


      async fetchUserProfile() {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No auth token found');
        }
        try {
          const response = await fetch('http://localhost:3000/api/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (error) {
          console.error('Error fetching user profile:', error);
          throw error;
        }
      }




      // async fetchUserProfile() {
      //   const token = localStorage.getItem('authToken');
      //   try {
      //     //const response = await fetch('http://localhost:3000/api/users/login', {
      //     const response = await fetch('http://localhost:3000/api/users/profile', {
      //       headers: {
      //         'Authorization': `Bearer ${token}`
      //       }
      //     });
      //     if (!response.ok) {
      //       throw new Error('Failed to fetch user profile');
      //     }
      //     return await response.json();
      //   } catch (error) {
      //     console.error('Error fetching user profile:', error);
      //     throw error;
      //   }
      // },
    

      
    },
    templates: {},
    render() {},
  };
  App.init();
})();

