/* eslint-disable import/no-cycle */
/* import { routes } from './components/Router.js'; */
import { LandingView } from './components/LandingPage.js';
import { SignUp } from './components/Register.js';
import { Login } from './components/Login.js';
import { ResetPassword } from './components/ForgotPassword.js';
import { Feed } from './components/Feed.js';

const routes = {
  '/': LandingView,
  '/Register': SignUp,
  '/Login': Login,
  '/ForgotPasword': ResetPassword,
  '/Feed': Feed,
};

export const onNavigate = (pathname) => {
  const rootDiv = document.getElementById('root');
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
};

window.addEventListener('DOMContentLoaded', () => {
  const rootDiv = document.getElementById('root');
  const component = routes[window.location.pathname];
  window.onpopstate = () => {
    rootDiv.appendChild(component());
  };
  rootDiv.appendChild(component());
});
