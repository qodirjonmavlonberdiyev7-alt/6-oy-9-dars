import { Student } from "../model/student.model.js";
Student.sync({ force: false });
export const getAllStudents = async (req, res, next) => {
    try {
        const student = await Student.findAll();
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const addStudent = async (req, res, next) => {
    try {
        const { full_name, phone_number, profession, parent_name, parent_number, image_url } = req.body;
        await Student.create({ full_name, phone_number, profession, parent_name, parent_number, image_url });
        res.status(201).json({
            message: "Added student"
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const updateStudent = async (req, res, next) => {
    try {
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
export const deleteStudent = async (req, res, next) => {
    try {
    }
    catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};
//# sourceMappingURL=student.ctr.js.map