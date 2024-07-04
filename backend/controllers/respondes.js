
const pdfParser = require("pdf-parse");
const {generateText} = require("../config/geme");

exports.create = async (req, res) => {
    try {
       
        const { jd } = req.body;
        if(!jd ){
            return res.status(400).send({
                status: 400,
                message: "No job description provided."
            });
        }
        if (!req.files || !req.files.pdfFile) {
            return res.status(400).send({
                status: 400,
                message: "No PDF file uploaded."
            });
        }


        let a = await pdfParser(req.files.pdfFile.data);
        let text = a.text;
        let input_prompt = `
                        Hey Act Like a skilled or very experience ATS(Application Tracking System)
                        with a deep understanding of tech field,software engineering,data science ,data analyst
                        and big data engineer. Your task is to evaluate the resume based on the given job description.
                        You must consider the job market is very competitive and you should provide
                        best assistance for improving thr resumes. Assign the percentage Matching based
                        on Jd and list down all missing keywords and skills with high accuracy
                        resume:${text}
                        description:${jd}
                        I want the response in one single string having the structure
                        { { "ATS score": "%", "MissingKeywords:[]", "Profile Summary": "" } }`
        let reply= await generateText(input_prompt);
        //console.log(reply);
        return res.status(200).send({
            success: true,
            message: reply
        })


    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).send({
            status: 500,
            success: false,
            message: "Error processing PDF. Please try again."
        });
    }
}