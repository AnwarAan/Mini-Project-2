import bcrypt from "bcrypt";

const hashPwd = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};

const comparePwd = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

export default { hashPwd, comparePwd };
