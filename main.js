// main.js
new Vue({
    el: '#app',
    data: {
      selectedOption: '', // Opción seleccionada en la barra de navegación
      promedio: 0,
      estado: '',
      promedioCalculado: false,
      nota1: null,
      nota2: null,
      nota3: null,
      asistencia: null,
      nota1Error: false,
      nota2Error: false,
      nota3Error: false,
      asistenciaError: false,
      nombre: '',
      nombreError: false,
      correo: '',
      correoError: false,
      contrasena: '',
      repetirContrasena: '',
      contrasenaError: false,
    },
    methods: {
      calcularPromedio() {
        const ponderacionNota1 = 0.35;
        const ponderacionNota2 = 0.35;
        const ponderacionNota3 = 0.30;
        const asistenciaMinima = 80;
        const promedioMin = 40;

        // Validar las notas y la asistencia
        this.nota1Error = this.nota1 < 10 || this.nota1 > 70;
        this.nota2Error = this.nota2 < 10 || this.nota2 > 70;
        this.nota3Error = this.nota3 < 10 || this.nota3 > 70;
        this.asistenciaError = this.asistencia < 0 || this.asistencia > 100 || this.asistencia === null || this.asistencia === '';

        // Si hay errores, no se realiza el cálculo
        if (this.nota1Error || this.nota2Error || this.nota3Error || this.asistenciaError) {
            this.promedioCalculado = false;
            return;
        }
      
  
        // Realizar el cálculo del promedio
        const promedioCalculado = (this.nota1 * ponderacionNota1) + (this.nota2 * ponderacionNota2) + (this.nota3 * ponderacionNota3);
        
        // Actualizar los resultados y estado de aprobación
        this.promedio = promedioCalculado.toFixed(2);   
        this.estado = ((this.asistencia >= asistenciaMinima) && this.promedio > promedioMin) ? 'Aprobado' : 'Reprobado';
        this.promedioCalculado = true;
      },
      enviarRegistro() {
        this.nombreError = this.nombre === '';
        this.correoError = !this.validarCorreoFormato(this.correo);
        this.contrasenaError = this.contrasena !== '' || this.repetirContrasena !== '' ? this.contrasena !== this.repetirContrasena : true;
  
        if (!this.nombreError && !this.correoError && !this.contrasenaError) {
          alert('El registro se ha realizado correctamente');
        }
      },

      validarNombre(){
        this.nombreError = this.nombre === '';
      },

        validarCorreo() {
        this.correoError = !this.validarCorreoFormato(this.correo);
      },

      validarCorreoFormato(correo) {
        // Validar el formato del correo utilizando una expresión regular
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
      },

      validarContrasena(){
        this.contrasenaError = this.contrasena !== this.repetirContrasena;  
      },
      limpiarFormulario(opcion) {
        if (opcion === 'calculo') {
          this.nota1 = null;
          this.nota2 = null;
          this.nota3 = null;
          this.asistencia = null;
          this.nota1Error = false;
          this.nota2Error = false;
          this.nota3Error = false,
          this.asistenciaError = false;
        } else if (opcion === 'registro') {
          this.nombre = '';
          this.correo = '';
          this.contrasena = '';
          this.repetirContrasena = '';
          this.nombreError = false;
          this.correoError = false;
          this.contrasenaError = false;
        }
      }
    }    
  });       