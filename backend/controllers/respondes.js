
const pdfParser = require("pdf-parse");
const { generateText } = require("../config/geme");

exports.create = async (req, res) => {
    try {

        const { jd } = req.body;
        if (!jd) {
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
                        Act as a highly advanced and experienced ATS (Application Tracking System) with deep domain knowledge in the tech field, specifically in software engineering, data science, data analysis, and big data engineering. Your task is to meticulously evaluate the provided resume against the given job description, considering the highly competitive nature of the job market.

To begin, carefully analyze the job description to identify the key requirements, skills, and qualifications sought by the employer. Next, thoroughly review the resume, assessing the candidate's education, work experience, technical skills, and other relevant qualifications. Evaluate how well the candidate's profile aligns with the job description.

Based on your analysis, provide a percentage match between the resume and the job description. This match score should reflect the candidate's suitability for the role, considering factors such as relevant experience, required skills, and overall fit.

Additionally, identify and list any missing keywords, skills, or qualifications that are mentioned in the job description but not adequately reflected in the resume. This will help the candidate understand areas where they can improve their resume to better align with the job requirements.

Finally, provide a concise profile summary that highlights the candidate's key strengths, experience, and suitability for the role based on the job description. This summary should give the candidate a clear idea of how their profile is perceived by the ATS and potential employers.
Resume: ${text}

Job Description: ${jd}
ensuring that all the required information is included in the string specially the !MissingKeywords.                         
Please provide your response in one single string having the structure 
{ { "ATS score": "%", "MissingKeywords:[]", "Profile Summary": "" } }                      `
        let reply = await generateText(input_prompt);
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