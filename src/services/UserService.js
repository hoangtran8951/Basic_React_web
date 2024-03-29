import instance from "./cus_axios";

const fecthAllUser = (page) => {
    return instance.get(`/api/users?page=${page}`);
}

const postCreateUser = (name, job) => {
     return instance.post("/api/users", {name, job});
}

const putUpdateUser = (name, job) => {
    return instance.patch("/api/users/2", {name, job});
}

const postLoginRequest = (email, password) => {
    return instance.post("/api/login", {email, password});
}

const deleteUser = () => {
    
    return instance.delete("/api/users/2")
}
export {fecthAllUser, postCreateUser, putUpdateUser, deleteUser, postLoginRequest};