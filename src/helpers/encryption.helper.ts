// import bcrypt from 'b'
import crypto from "crypto-js";
import bcrypt from "bcrypt";

const PEPPER = "596a96cc7bf9108cd896f33c44aedc8a";

export const genSalt = () => {
  return bcrypt.genSaltSync(15);
};

export const generatePassword = (data: string, salt: string) => bcrypt.hashSync(data, salt)

export const encodePepper = (data: string) => crypto.MD5(data).toString()

export const setupPassword = (pepperPassword: string, id: string) => crypto.MD5(`${pepperPassword}${id}`).toString()

export const createPepperPassword = (password: string) => encodePepper(password)

export const createPassword = (password: string, id: string) => {
  const salt = genSalt();
  const customPassword = setupPassword(password, id);
  const hassPassword = generatePassword(customPassword, salt);
  return hassPassword;
};

export const comparePassword = (password: string, id: string, hassPassword: string) => {
  const customPassword = setupPassword(password, id);
  const result = bcrypt.compareSync(customPassword, hassPassword);
  return result;
};

// const webInputpass = encryptionHelper.createPepperPassword("fuckyouuuodauosudoausdoausdoausodausoduss");
// console.log('webInputpass', webInputpass);

// const dbHash = encryptionHelper.createPassword(webInputpass, "what_the_hell");
// console.log('dbHash', dbHash);

// const cond = encryptionHelper.comparePassword(webInputpass, "what_the_hell", dbHash);
// console.log('cond', cond);
