const Student = require('./student.model.js');

//Create new Product
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "student details can not be empty"
        });
    }

    // Create a Product
    const student = new Student({
        name: req.body.name || "No name", 
        dpt: req.body.dpt,
        id: req.body.id,
    });

    // Save Product in the database
    student.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the student details."
        });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving student details."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Student.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student details not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "students details not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving student with id " + req.params.studentId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }

    // Find and update product with the request body
    Student.findByIdAndUpdate(req.params.studentId, {
        name: req.body.title || "No name", 
        dpt: req.body.dpt,
        id: req.body.id,
    }, {new: true})
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student details not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student details not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.studentId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student details not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student details deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student details not found with id " + req.params.studentId
            });                studentId
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.studentId
        });
    });
};