import config from '../config.js';

(() => {
    const App = {
      htmlElements: {
        serviceList: document.getElementById('serviceList'),
        modal: document.getElementById('appointmentModal'),
        modalContent: document.getElementById('modalContent'),
        closeModal: document.getElementById('closeModal'),
      },
      init() {
        App.initialValidations();
        App.bindEvents();
        App.methods.fetchServices();
      },
      initialValidations() {
        // Realizar validaciones iniciales si es necesario
      },
      bindEvents() {
        App.htmlElements.closeModal.addEventListener('click', App.methods.hideAppointmentForm);
        window.addEventListener('click', (event) => {
          if (event.target === App.htmlElements.modal) {
            App.methods.hideAppointmentForm();
          }
        });
      },
      handlers: {
        bookAppointment(serviceId) {
          console.log(`Agendando cita para el servicio con ID: ${serviceId}`);
          App.methods.showAppointmentForm(serviceId);
        },
        submitAppointment(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const appointmentData = Object.fromEntries(formData.entries());
            console.log('Datos de la cita:', appointmentData);
          
            // Preparar los datos para enviar al servidor
            const ordenServicio = {
              usuario: appointmentData.clientName, // Asumiendo que el nombre del cliente es el usuario
              idDelServicio: appointmentData.serviceId,
              usuarioDelProveedor: "proveedor_id", // Esto debería venir de algún lugar, quizás del servicio seleccionado
              estado: 'pendiente',
              citasDelServicio: [{
                fechaInicial: appointmentData.appointmentDateInicio,
                fechaFinal: appointmentData.appointmentDateFinal,
                horaInicio: appointmentData.appointmentTimeIni,
                horaFin: appointmentData.appointmentTimeFin
              }],
              cantidad: App.methods.calcularHoras(appointmentData.appointmentTimeIni, appointmentData.appointmentTimeFin),
              precio: 0, // Esto debería venir del servicio seleccionado
              monto: 0 // Esto se calculará en el backend
            };
          
            // Enviar los datos al servidor
            fetch(`${config.API_BASE_URL}/api/ordenes/addorden`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ordenServicio),
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log('Orden de servicio creada:', data);
              alert('Cita agendada con éxito');
              App.methods.hideAppointmentForm();
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('Hubo un error al agendar la cita. Por favor, intente de nuevo.');
            });          

          //alert('Cita agendada con éxito');
          //App.methods.hideAppointmentForm();
        },
      },
      methods: {
        // Método auxiliar para calcular la cantidad de horas
        calcularHoras(horaInicio, horaFin) {
            const inicio = new Date(`1970-01-01T${horaInicio}`);
            const fin = new Date(`1970-01-01T${horaFin}`);
            return (fin - inicio) / 1000 / 60 / 60; // Convertir milisegundos a horas
        },

        async fetchServices() {
          try {
            const response = await fetch(`${config.API_BASE_URL}/api/servicios/serviciosgetall`);
            const services = await response.json();
            App.render(services);
          } catch (error) {
            console.error('Error al obtener los servicios:', error);
          }
        },
        showAppointmentForm(serviceId) {
          const formHtml = App.templates.appointmentFormTemplate(serviceId);
          App.htmlElements.modalContent.innerHTML = formHtml;
          App.htmlElements.modal.style.display = 'flex';
        },
        hideAppointmentForm() {
          App.htmlElements.modal.style.display = 'none';
        },
      },
      templates: {
        serviceTemplate(service) {
            //               <p>Tipo de Servicio: ${service.tipoServicio}</p>
            // Obtener la primera imagen del array de imágenes
            //const imagen = service.imagenes && service.imagenes.length > 0 ? service.imagenes[0] : null;

            // Convertir el blob en una URL de datos
            //const imagenUrl = imagen ? `data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(imagen.data)))}` : '';

            const imagenUrl = service.imagenes && service.imagenes.length > 0 ? service.imagenes[0] : '';

            return `
              <div class="service-card">
                  <div class="service-content">
                      <h2 class="service-content h2">${service.nombre}</h2>
  
                      <p class="service-content p">Descripción: ${service.descripcion}</p>
                      <p class="service-content p">Amenidades: ${service.amenidades}</p>
                      <p class="service-content p">Días de la Semana: ${service.diasSemana.join(', ')}</p>
                      <p class="service-content p">Horario: ${service.horarioDesde} - ${service.horarioHasta}</p>
  
                      <p class="service-price">Precio por Hora: $${service.precioHora}</p>
                      <button class="appointment-button" onclick="App.handlers.bookAppointment('${service._id}')">Agendar Cita</button>
                  </div>
                  <div class="service-image">
                       ${imagenUrl ? `<img src="${imagenUrl}" alt="${service.nombre}">` : ''}
                      <!-- Placeholder for image -->
                  </div>
              </div>
            `;
        },
        appointmentFormTemplate(serviceId) {
          return `
 <form onsubmit="App.handlers.submitAppointment(event)">
      <input type="hidden" name="serviceId" value="${serviceId}">
      
      <div class="form-group">
        <label for="appointmentDateInicio">Fecha Inicio:</label>
        <input type="date" id="appointmentDateInicio" name="appointmentDateInicio" required>
      </div>


      <div class="form-group">
        <label for="appointmentDateFinal">Fecha Final:</label>
        <input type="date" id="appointmentDateFinal" name="appointmentDateFinal" required>
      </div>

      <div class="form-group">
        <label for="appointmentTimeIni">Hora inicio:</label>
        <input type="time" id="appointmentTimeIni" name="appointmentTimeIni" required>
      </div>

      <div class="form-group">
        <label for="appointmentTimeFin">Hora final:</label>
        <input type="time" id="appointmentTimeFin" name="appointmentTimeFin" required>
      </div>

      <div class="form-group">
        <label for="clientName">Nombre:</label>
        <input type="text" id="clientName" name="clientName" required>
      </div>

      <div class="form-group">
        <label for="clientEmail">Email:</label>
        <input type="email" id="clientEmail" name="clientEmail" required>
      </div>

      <button type="submit" class="submit-btn">Confirmar Cita</button>
    </form>
          `;
        },
      },
      render(services) {
        const serviceListHTML = services.map(App.templates.serviceTemplate).join('');
        App.htmlElements.serviceList.innerHTML = serviceListHTML;
      },
    };
    App.init();

    // Make App globally accessible
    window.App = App;
  })();
