import { Company } from "../models/company.model.js"

export const registerCompany = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Comapny Name is Required"
            })
        }

        let company = await Company.findOne({
            name: name
        })

        if (company) {
            return res.status(400).send({
                success: false,
                message: "The company is already register with this name."
            })
        }

        // console.log(req.id);

        company = await Company.create({
            name: name,
            userId: req.id,
        })

        return res.status(201).send({
            success: true,
            message: "The company is register successfull."
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}



export const getCompany = async (req, res) => {
    try {
        // get all company that is created by a particular user
        const userId = req.id;

        const companies = await Company.find({ userId })

        if (!companies) {
            return res.status(404).send({
                success: false,
                message: "Company is not found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Company is found Successfull",
            company: companies,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        // get all company that is created by a particular user
        const companyId = req.params.id;
        console.log(companyId);

        const company = await Company.findOne({ _id: companyId })

        if (!company) {
            return res.status(404).send({
                success: false,
                message: "Company not found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Company is found Successfull",
            company: company,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

// update Company
export const updateCompany = async (req, res) => {
    try {
        const { name, about, website, location } = req.body

        // file for logo
        const file = req.file;

        // TODO: Cloudinary

        const updateData = { name, about, website, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).send({
                success: false,
                message: "Company Not Found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Company information update successfully"
        })



    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}