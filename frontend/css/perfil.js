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
      mostrarPerfil() {
        const sesionValida = await checkUserSession();
        if (sesionValida) {



          // La redirección ya se maneja en checkUserSession, 
          // pero puedes agregar lógica adicional aquí si es necesario
        }
        if (App.methods.usuarioAutenticado()) {
          const arrayUserAutenticado = App.methods.usuarioAutenticado();
          console.log(arrayUserAutenticado);
          const { nombre, nombrecompleto, descripcion, imagen, pais, email, celular} = App.methods.usuarioAutenticado();
          const profileContainer = document.getElementById('profileContainer');
          profileContainer.innerHTML = `
            <img src="${imagen}" alt="${nombre}" width="200" height="200">
            <h2>${nombrecompleto}</h2>
            <p>${email}</p>
            <p>${descripcion}</p>
            <p>Contacto:${celular}</p>
            <p>${pais}</p>           
          `;
        } 
        else {
          // Redirigir a login.html si no hay usuario autenticado
          window.location.href = 'login.html';
        }
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

      
    },
    templates: {},
    render() {},
  };
  App.init();
})();

