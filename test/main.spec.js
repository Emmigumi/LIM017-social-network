import { SignUp } from '../src/components/Register.js';
import { onNavigate } from '../src/main.js';
// import { routes } from '../src/components/Router.js';

jest.mock('../src/Firebase/Firebase-util.js');

// Intento fallido main Line-16 routes not function
describe('Función onNavigate', () => {
  it('La función onNavigate debe cargar vista register', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const registerDiv = SignUp();
    console.log('uno', registerDiv);
    /* const routess = routes;
    console.log('dos', routess); */
    expect(onNavigate('/Register')).toEqual(registerDiv);
  });
});
