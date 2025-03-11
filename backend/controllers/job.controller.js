import { Job } from "../models/job.model.js";


export const postJob = async (req, res) => {
    try {

        const { title, description, requirements, salary, location, jobType, experienceLevel, numOfPosition, company } = req.body
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !numOfPosition || !company) {
            return res.status(400).send({
                success: false,
                message: "Something is missing."
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            jobType,
            location,
            experienceLevel: Number(experienceLevel),
            numOfPosition: Number(numOfPosition),
            company,
            createdBy: userId,
        })

        return res.status(201).send({
            success: true,
            message: "Job created successfully",
            job: job
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message,
        })
    }

}

// Students
export const getAllJobs = async (req, res) => {
    try {

        const keywords = req.query.keywords || ""

        // for regex
        const query = {
            $or: [
                { title: { $regex: keywords, $options: "i" } },
                { description: { $regex: keywords, $options: "i" } },
            ]
        };

        // populate -> refernce ID se us ka complete object le kr aajana
        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

        // if not found
        if (!jobs) {
            return req.status(404).send({
                success: false,
                message: "Jobs not found",
            })
        }

        return res.status(200).send({
            success: true,
            jobs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}


// Students
export const getjobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).send({
                success: false,
                message: "Job Not Found"
            })
        }

        return res.status(200).send({
            success: true,
            job
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message,
        })
    }
}


// ADMIN which create the Job

export const getJobsByAdmin = async (req, res) => {
    try {
        const userId = req.id
        console.log(userId);

        const jobs = await Job.find({ "createdBy": userId }).populate({
            path: "company",
            createdAt: -1
        })

        if (!jobs) {
            return res.status(404).send({
                success: false,
                message: "Jobs is not found"
            });
        }

        return res.status(200).send({
            success: true,
            jobs
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({
            success: false,
            error: error.message
        });
    }
}
