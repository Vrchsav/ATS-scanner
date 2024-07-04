
const {GoogleGenerativeAI} = require("@google/generative-ai");
require("dotenv").config();


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
exports.generateText=async (prompt) => {
    
    const model = genAI.getGenerativeModel({model : "gemini-pro"})

    const result = await model.generateContent(prompt);
    //console.log(result)

    const response = await result.response;
    //console.log(response)

    const text =response.text();
    return text;
    console.log(text)
}

