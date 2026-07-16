import "dotenv/config"
import jwt from "jsonwebtoken"

const createAuthSession = (userId) => {
  const authSession = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )
    return authSession;
}


export default createAuthSession;
