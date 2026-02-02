import type { NextFunction, Request, Response } from "express";
import { Student } from "../model/student.model.js";

export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await Student.findAll()
        res.status(200).json(student)
    } catch (error:any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const addStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {} = req.body
    } catch (error:any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error:any) {
        res.status(500).send({
            message: error.message
        })
    }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error:any) {
        res.status(500).send({
            message: error.message
        })
    }
}