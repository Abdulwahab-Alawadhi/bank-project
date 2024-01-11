import instance from ".";
import { saveToken } from "./storage";

const login = async (userInfo) => {
  const { data } = await instance.post(
    "/mini-project/api/auth/login",
    userInfo
  );
  if (data.token) {
    saveToken(data.token);
  }
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);
  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );

  if (data.token) {
    saveToken(data.token);
  }

  return data;
};

const myUser = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};
const withdraw = async (amount) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/withdraw",
    amount
  );
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

export { login, register, myUser, getAllUsers, myBalance };
