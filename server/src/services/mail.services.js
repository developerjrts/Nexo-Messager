import transporter from "../config/transporter.js";


export const verificationMail = async(email, authSession) => {
    try {
        console.log("Sending Mail.");
        
        const mail = await new Promise((resolve, reject) => {
            transporter.sendMail({
                    from: "Nexo Messenger <noreply@jrts.dev>",
                    to: email,
                    subject: "Verification Mail",
                    html: `
                    <div style="
                    font-family: Arial, sans-sarif; max-width: 600px; min-height: 600px; margin: auto
                    ">
                    <h1>Hey, Hi👋 Welcome to Nexo Messanger</h1>
                    <p>Click the button to verify you mail adress!</p>
                   <a 
                        href="${process.env.CLIENT_URL}/verify-mail?auth_session=${authSession}"
                        style="
                        font-family: Arial, sans-sarif; width: fit; padding: 15px; border-radius: 5px; background-color: #6001d1; color: #FFF; text-decoration: none; font-weight: 700;">
                        Verify E-Mail
                    </a>
                    </div>
                    `
                }, (err, info) => {
                    if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
                })
        })

                console.log("Mail Sent.");

                return true;
                
    } catch (error) {
        console.log(error);
        return false;
        
    }
}