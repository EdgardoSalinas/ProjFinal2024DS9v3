import config from '../config.js';

// const config = require('../config');
import { isUserLoggedIn, validateTokenWithBackend, checkUserSession } from './auth.js';
import { getCurrentUserType, setCurrentUserType } from './globalState.js';

(() => {
    const App = {
      htmlElements: {
        mainForm: document.getElementById("mainForm"),
        usuariobienvenido: document.getElementById("usuariobienvenido"),
        btnLogout: document.getElementById("btnLogout"),
        btnPerfil: document.getElementById("btnPerfil"),
        // menu lateral 
        menuCarrito: document.querySelector('.sidebar a[href="#carrito"]'),
        menuPerfil: document.querySelector('.sidebar a[href="#perfil"]'),
        menuServicios: document.querySelector('.sidebar a[href="#servicios"]'),
        menuOrdenes: document.querySelector('.sidebar a[href="#ordenes"]'),
        menuFacturas: document.querySelector('.sidebar a[href="#facturas"]'),
      },
      init() {
        App.bindEvents();
        App.methods.checkSesionExiste();
      },
      bindEvents() {
  
        App.htmlElements.btnLogout.addEventListener(
          "click",
          App.handlers.onClickLogout,
        );
        // App.htmlElements.btnPerfil.addEventListener(
        //   "click",
        //   App.handlers.onClickPerfil,
        // );
        App.htmlElements.menuCarrito.addEventListener("click", App.handlers.onClickCarrito);
        App.htmlElements.menuPerfil.addEventListener("click", App.handlers.onClickPerfil);
        App.htmlElements.menuServicios.addEventListener("click", App.handlers.onClickServicios);
        App.htmlElements.menuOrdenes.addEventListener("click", App.handlers.onClickOrdenes);
        App.htmlElements.menuFacturas.addEventListener("click", App.handlers.onClickFacturas);

      },
      handlers: {
        onClickLogout() {
          App.methods.hacerLogout();
        },
        onClickPerfil() {
          App.methods.openPerfil();
        },
        onClickCarrito() {
          App.methods.openPerfil();
          // Lógica para manejar el clic en "Carrito de Compra"
        },
        onClickPerfil() {
          App.methods.openPerfil();
            // Lógica para manejar el clic en "Perfil"
        },
        onClickServicios() {
          App.methods.openServicio();
          // Lógica para manejar el clic en "Servicios por Proveedor"
        },
        onClickOrdenes() {
          App.methods.openPerfil();
          // Lógica para manejar el clic en "Mis Ordenes"
        },
        onClickFacturas() {
          App.methods.openPerfil();
            // Lógica para manejar el clic en "Mis Facturas"
        },

      },
      methods: {
        async checkSesionExiste() {
          const sesionValida = await checkUserSession();


          if (!sesionValida) {
                // Inicializar el tipo de usuario al cargar la aplicación
            const userType = getCurrentUserType();
            //this.configurarAplicacionParaTipoUsuario(userType);
            window.location.href = 'login.html';
            // La redirección ya se maneja en checkUserSession, 
            // pero puedes agregar lógica adicional aquí si es necesario
          }else{
            App.methods.cargarNombreUsuario();
          }
          //window.location.href = 'login.html';
          // Obtener token del usuario para checar si hay coneccion
  
        },
        async cargarNombreUsuario() {
          try {
            //const response = await fetch('http://localhost:3000/api/users/profile', {
            const response = await fetch(`${config.API_BASE_URL}/api/users/profile`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
              }
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch user profile');
            }
    
            const userProfile = await response.json();
            App.methods.mostrarNombreUsuario(userProfile.nombre);
          } catch (error) {
            console.error('Error al cargar el perfil del usuario:', error);
            App.methods.mostrarNombreUsuario('Usuario');
          }
        },
    
        mostrarNombreUsuario(nombre) {
          App.htmlElements.usuariobienvenido.textContent = `Bienvenido, ${nombre}`;
        },
        hacerLogout(){
          // aqui hay que borrar los token del usuario
          localStorage.removeItem('authToken');
          localStorage.removeItem('tokenExpiration');
          localStorage.removeItem('userType');
          localStorage.removeItem('userName');
          localStorage.removeItem('userId');
          window.location.href = "index.html";
        },
        openPerfil(){
          const userType = getCurrentUserType();
          if (userType === 'usuario') {
            window.location.href = 'perfil.html';
          } else if (userType === 'proveedor') {
            window.location.href = 'perfilp.html';
          }
        },
        openServicio(){
          const userType = getCurrentUserType();
          if (userType === 'proveedor') {
            window.location.href = 'nuevo-servicio.html';
          } 
        },

          // fin methods
        },
  
        templates: {},
  
        render(elemento,html) {
          //App.htmlElements.indexForm.innerHTML = html;
          document.getElementById(elemento).innerHTML = html;
        },
  
    }; // fin de const App
    App.init();
  })();