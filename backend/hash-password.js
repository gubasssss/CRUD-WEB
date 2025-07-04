const bcrypt = require('bcryptjs');

const plainTextPassword = 'admin123'; 
const saltRounds = 10;

const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);

console.log('Senha em texto puro:', plainTextPassword);
console.log('---');
console.log('Copie este hash para usar no seu SQL:');
console.log(hashedPassword);