import { isUserLoggedIn, validateTokenWithBackend, checkUserSession } from './auth.js';
import { getCurrentUserType, setCurrentUserType } from './globalState.js';

(() => {
    const App = {
      htmlElements: {
        mainForm: document.getElementById("mainForm"),
        usuariobienvenido: document.getElementById("usuariobienvenido"),
        btnLogout: document.getElementById("btnLogout"),
        btnPerfil: document.getElementById("btnPerfil"),
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
        App.htmlElements.btnPerfil.addEventListener(
          "click",
          App.handlers.onClickPerfil,
        );

        

      },
      handlers: {
        onClickLogout() {
          App.methods.hacerLogout();
        },
        onClickPerfil() {
          App.methods.openPerfil();
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
          }
          //window.location.href = 'login.html';
          // Obtener token del usuario para checar si hay coneccion
  
        },
        hacerLogout(){
          // aqui hay que borrar los token del usuario
          localStorage.removeItem('authToken');
          localStorage.removeItem('tokenExpiration');
          window.location.href = "index.html";
        },
        openPerfil(){
          const userType = getCurrentUserType();
          if (userType === 'usuario') {
            window.location.href = 'perfil.html';
          } else if (userType === 'proveedor') {
            window.location.href = 'perfilprov.html';
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