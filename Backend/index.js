const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const employeeSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
    },
    password: String,
    department: String,
    project: String,
    leaves: {
        type: Number,
        default: 21,
    },
})
const Employee = mongoose.model('employee', employeeSchema)

const projectSchema = new mongoose.Schema({
    name: String,
})
const Project = mongoose.model('project', projectSchema)

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === '1' && password === '1') {
            // Admin login
            res.json({ success: true, isAdmin: true });
        } else {
            // Employee login
            const employeeData = await Employee.findOne({ email, password });
            if (employeeData) {
                const { project } = employeeData;
                const matchingEmployees = await Employee.find({
                    project,
                    _id: { $ne: employeeData._id }
                });
                const matchingEmployeeNames = matchingEmployees.map(emp => ({ name: emp.name, email: emp.email }));
                res.json({ success: true, isAdmin: false, employeeData, matchingEmployees: matchingEmployeeNames });
            } else {
                res.json({ success: false, message: 'Invalid email or password' });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
});


app.post('/employees', async (req, res) => {
    try {
        const { name, email, password, project, department } = req.body
        const newEmployee = new Employee({ name, email, password, department, project })
        const empId = await newEmployee.save()
        res.json({ success: true, message: 'Employee Added Succesfully', empId: empId })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Internal Server Error' })
    }
})

app.post('/projects', async (req, res) => {
    try {
        const { name } = req.body
        const newProject = new Project({ name })
        await newProject.save()
        res.json({ success: true, message: 'Project Added Succesfully' })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: 'Internal Server Error' })

    }
})

app.get('/employees', async (req, res) => {
    const employeeData = await Employee.find()
    res.json(employeeData)
})

app.get('/projects', async (req, res) => {
    const projectData = await Project.find()
    res.json(projectData)
})

app.get('/employees/:employeeId', async (req, res) => {
    const { employeeId } = req.params
    const employeeData = await Employee.findById(employeeId)

    if (employeeData) {
        res.json({ success: true, employeeData: employeeData });
    } else {
        res.json({ success: false, message: 'Employee not found' });
    }
})

app.put('/employees/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    const updatedEmployeeData = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            updatedEmployeeData,
            { new: true }
        );

        if (updatedEmployee) {
            res.json({ success: true, message: 'Employee updated successfully' });
        } else {
            res.json({ success: false, message: 'Employee not found' });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Internal Server Error' });
    }
});

app.delete('/employees/:id', async (req, res) => {
    const id = req.params.id
    await Employee.findByIdAndRemove(id)
    res.json({ success: true, message: 'Employee Deleted Succesfully' })

})

app.listen(5001, () =>
    console.log('Server is Running on port 5001')
)