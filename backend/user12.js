import mongoose from 'mongoose';

await mongoose.connect('mongodb+srv://new_user001:qwerty123456@employeedb.q5lb2vj.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeDB'); // replace with your DB

await mongoose.connection.collection('users').dropIndex('email');

console.log('Dropped username_1 index');
await mongoose.disconnect();
