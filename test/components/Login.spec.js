import { LoginByEmailPassword } from '../../src/Firebase/auth';
import { Login } from '../../src/components/Login';

jest.mock('../../src/Firebase/Firebase-util.js');

/* describe('', () => {
  it('', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const result = Login();
    console.log(result);
    const btnMail = result.querySelector('#mail-input');
    console.log(btnMail);
    btnMail.dispatchEvent(new Event('blur'));
    const message = alert('Correo inválido - Verifica tu dirección de correo');
    console.log(message);
expect(message).toEqual('Correo inválido - Verifica tu dirección de correo');
  });
}); */
