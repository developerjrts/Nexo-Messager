import "dotenv/config"
import nodeMailer from "nodemailer";

const user = {
    mail: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
}

console.log(user);


const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: user.mail,
        pass: user.pass
    }
});


export default transporter

