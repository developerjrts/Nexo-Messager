import "dotenv/config"
import nodeMailer from "nodemailer";

const user = {
    mail: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
}


const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: user.mail,
        pass: user.pass
    },
    secure: true
});


export default transporter

