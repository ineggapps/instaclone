import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      console.log("request*", request);
      const { email } = args;
      const loginSecret = generateSecret();
      console.log(`secret key is ${loginSecret}`);
      try {
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
      return;
    }
  }
};
