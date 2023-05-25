import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../asset/style/Log_in.css";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';

// Importaciones de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  // Nuevo estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async values => {
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      var user = userCredential.user;
      Swal.fire(
        'Bienvenido!',
        '' + user.email,
        'success'
      );
      navigate('/Index');
    } catch (error) {
      Swal.fire(
        'Error!',
        '' + error.message,
        'error'
      );
    }
  }

  // Nueva función para cambiar el estado de mostrar contraseña
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="container w-75 mt-5 bg-light rounder shadow">
      <div className="row align-items-stretch">
        <div className="col bg d-none d-lg-block col-md-5 col-lg-7 col-xl-6 rounder"></div>
        <div className="col p-5 rounder-end">
          <div className="text-end">
            <h3>Fdez</h3>
          </div>
          <h2 className="fw-bold text-center py-5">Bienvenido</h2>

          <form className="was-validated" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="form-label">Escribe Tu Correo</label>
              <input type="text" className="form-control" id="email" placeholder="Email" required {...register("email", {
                required: {
                  value: true,
                  message: "El campo requerido",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalido email"
                }
              })}></input>
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
            </div>
            <div className="mb-4">
              <label className="form-label">Escribe Tu Constraseña</label>
              <div className="input-group">
                <input className="form-control" type={showPassword ? "text" : "password"} placeholder="Password" required {...register("password", {
                  required: {
                    value: true,
                    message: "El campo requerido",
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener minimo 8 caracteres"
                  }
                })}></input>
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
              </div>
            </div>
            <div className="my-3">
              <span><Link to="/Recoverpass">Forgot password?</Link></span>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
            </div>

            <div className="my-3">
              <span className="fw-bold">No tienes Cuenta? <Link to="/Signup">Create account</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;





