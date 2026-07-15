import "dotenv/config"
import jwt from "jsonwebtoken"

const createAuthSession = (userId: string) => {
  const authSession = jwt.sign(
        {userId},
        process.env.JWT_SECRET as string,
        {expiresIn: "7d"}
    )
    return authSession;
}


export default createAuthSession;
