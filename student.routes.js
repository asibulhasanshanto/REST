module.exports = (app) => {
    const students = require('./student.controller.js');

    // Create a new Product
    app.post('/students', students.create);

    // Retrieve all Products
    app.get('/students', students.findAll);

    // Retrieve a single Product with productId
    app.get('/students/:studentId', students.findOne);

    // Upda a Note with productId
    app.put('/students/:studentId', students.update);

    // Delete a Note with productId
    app.delete('/students/:studentId', students.delete);
}