import { store, deletePost } from '../../src/Firebase/firestore.js';
// importación añadida, borrar si no funciona
import { collection, doc } from '../../src/Firebase/Firebase-util';

jest.mock('../../src/Firebase/Firebase-util.js');

// Intento dos- sino corre lo borro o comento
// collection de firebase se llamó una vez con db y recetas como parámetro
// console.log(collection.mock);
// getDocs se llama con el valor de retorno de collection de firebase
// retorna una promesa que resuelve a un array
describe('ObtenerDatos', () => {
  it('debería ser una función', () => {
    const dbTest = {};
    const result = store(dbTest);
    /* console.log(store(dbTest));
    console.log(collection.mock.calls[0]); */
    expect(collection.mock.calls[0]).toEqual([dbTest, result]);
  });
});

describe('Obtener datos creo', () => {
  it('debería ser una función', () => {
    expect(typeof store).toBe('function');
  });
});

describe('borrar datos', () => {
  it('debe borrar un post', () => {
    const id = {};
    const result = deletePost(id);
    console.log('Uno', deletePost());
    console.log('colection', doc.mock.calls[0]);
    expect(doc.mock.calls[0]).toEqual([id, 'publicaciones', result]);
  });
});
