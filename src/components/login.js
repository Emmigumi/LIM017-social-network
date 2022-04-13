<div className="form-container-all">
      <div className="form-message">
        <h2 className="form-message-title">Inicia sesión </h2>
        <h3 className="form-message-subtitle">
          Ingresa tu dirección de correo eléctronico y contraseña para acceder a
          tu cuenta
        </h3>
      </div>


      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-input-container">
          <input
            className="form-input"
            type="email"
            placeholder="ingresa tú correo"
            name="email"
            id="email"
            onChange={handleChange}
          />

          <input
            className="form-input"
            type="password"
            placeholder="ingresa tú contraseña"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <section className="form__buttons">
          <div className="button-register-container">
            <button className="button-option">Iniciar Sesion</button>
            <button className="button-option" onClick={handleGoogleSignin}>
              Iniciar sesion con Google
            </button>
          </div>
          <div className="other_enlaces">
            <Link to="/register" className="button-info-register">
              ¿Eres nuevo por aquí? Registrate ahora
            </Link>
            <a
              href="#!"
              onClick={handleResetPassword}
              className="forgot-passoword-register"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </section>
      </form>
    </div>

