(() => {

    // Obtener datos del usuario del almacenamiento local
    // const usuarioAutenticado = JSON.parse(localStorage.getItem('usuarioAutenticado'));


    const App = {
      htmlElements: {
        form: document.getElementById("formaRegistrarse"),
        btnSalvar: document.getElementById("btnRegistrarse"),
        btnCerrar: document.getElementById("btnCerrar"),
        usuario: document.getElementById("usuario"),
        nombre: document.getElementById("nombre"),
        apellido: document.getElementById("apellido"),
        contrasena: document.getElementById("contrasena"),
        email: document.getElementById("email")
      },
      init() {
        // const urlParams = new URLSearchParams(window.location.search);
        // const tipoUsuario = urlParams.get('tipousuario');
        App.bindEvents();
        //App.methods.cargarPerfil();
        // App.initialValiations();
      },
      // initialValiations() {
      //   Session.shouldNotBeLoggedIn();
      // },
      bindEvents() {
        App.htmlElements.btnCerrar.addEventListener(
          "click",
          App.handlers.onClickLogout,
        );
        App.htmlElements.btnSalvar.addEventListener(
          "click",
          App.handlers.onClickSalvar,
        );
  
      },
      handlers: {
        // onSubmit(event) {
        //   event.preventDefault();
        //   const { username, password } = event.target.elements;
        //   Session.login(username.value, password.value);
        // },
        onClickLogout(event) {
          event.preventDefault();
          App.methods.hacerLogout();
        },
        onClickSalvar(event) {
          event.preventDefault();
          App.methods.hacerSalvar();
          const divResultado = document.getElementById("divresultado");
          divResultado.innerHTML = "Registro exitoso";
          const btnVolver = document.createElement("button");
          btnVolver.innerText = "Retornar";
          btnVolver.addEventListener("click", () => {
              window.location.href = "index.html";
          });
          divResultado.appendChild(btnVolver);
         // App.methods.cargarPerfil();
        },
  
      },
      methods: {
        cargarPerfil() {
          if (App.methods.usuarioAutenticado()) {
              window.location.href = 'index.html';
  
          } 
          else {
            // Redirigir a login.html si hay usuario autenticado
            //window.location.href = 'index.html';
          }
        },
        usuarioAutenticado() {
          return JSON.parse(localStorage.getItem("usuarioAutenticado"));        
        },
        hacerLogout(){
          //localStorage.removeItem("usuarioAutenticado");
          window.location.href = "index.html";
        },
  
        hacerSalvar(){
            const urlParams = new URLSearchParams(window.location.search);
            const tipoUsuario = urlParams.get('tipousuario');
            const userData = {
                "usuario": App.htmlElements.usuario.value
                ,"tipodeusuario": tipoUsuario
                ,"nombre": App.htmlElements.nombre.value
                ,"apellido": App.htmlElements.apellido.value
                ,"email": App.htmlElements.email.value
                ,"contrasena": App.htmlElements.contrasena.value
                }
              
              App.methods.registerUser(userData)
                .then(result => {
                  // Handle successful registration
                })
                .catch(error => {
                  // Handle registration error
                });
          // In your main app file (e.g., app.js)

          // const userData = JSON.parse(localStorage.getItem('usuarioNuevo'));
          // userData.nombrecompleto = App.htmlElements.nombreCompleto.value ;
          // if (!(userData.contraseña == parseInt(App.htmlElements.contrasena.value))){
          //     userData.contraseña = App.methods.hashCode(App.htmlElements.contrasena.value);
          // }
          // userData.email = App.htmlElements.email.value;
          // userData.descripcion = App.htmlElements.descripcion.value;
          // userData.celular = App.htmlElements.celular.value;
          // userData.pais = App.htmlElements.pais.value;
          // { usuario: 'Juan', contraseña: '48690', nombrecompleto: 'Juan Bosco'
          //         , descripcion: 'Desarrollador Web', imagen: 'juan.jpg', pais: 'Panamá', email: 'juanz@gmail.com', celular: '507-6626438'  },
        //   const userData = {
        //       usuario: App.htmlElements.usuario.value,
        //       contraseña: App.methods.hashCode(App.htmlElements.contrasena.value).toString(),
        //       nombrecompleto: App.htmlElements.nombreCompleto.value,
        //       descripcion: App.htmlElements.descripcion.value,
        //       imagen: App.htmlElements.usuario.value.toString() + '.jpg',
        //       pais: App.htmlElements.pais.value,
        //       email: App.htmlElements.email.value,
        //       celular: App.htmlElements.celular.value
        //   };

        //   localStorage.setItem('usuarioNuevo', JSON.stringify(userData));
  
        },
        
        async  registerUser(userData) {
            try {
              const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              });
          
              if (!response.ok) {
                throw new Error('Failed to register user');
              }
          
              const result = await response.json();
              console.log('User registered successfully:', result);
              return result;
            } catch (error) {
              console.error('Error registering user:', error);
              throw error;
            }
          },

      //   hashCode(str) {
      //     let hash = 0;
      //     for (let i = 0, len = str.length; i < len; i++) {
      //         let chr = str.charCodeAt(i);
      //         hash = (hash << 5) - hash + chr;
      //         hash |= 0; // Convertir a entero de 32 bits
      //     }
      //     return hash;
      // }
  
      },
      templates: {},
      render() {},
    };
    App.init();
  })();
  
  