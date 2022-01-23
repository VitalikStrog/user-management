import {AxiosResponse} from "axios";

const axios = require('axios');
const BASE_URL = 'https://frontend-candidate.dev.sdh.com.ua/v1/';

export function getUsers(): User[] {
  return axios.get(`${BASE_URL}/contact`)
    .then((response: AxiosResponse<User[]>) => response.data);
}

export function getUser(userId: number): User {
  return axios.get(`${BASE_URL}/contact/${userId}`)
    .then((response: AxiosResponse<User>) => response.data);
}

export function createUser(newUser: User): User {
  return axios.post(`${BASE_URL}/contact/`, newUser)
    .then((response: AxiosResponse<User>) => response);
}

export function editUser(userId: number, editedFields: Partial<User>): User {
  return axios.put(`${BASE_URL}/contact/${userId}`, editedFields)
    .then((response: AxiosResponse<User>) => response);
}

export function deleteUser(userId: number): User {
  return axios.delete(`${BASE_URL}/contact/${userId}`);
}