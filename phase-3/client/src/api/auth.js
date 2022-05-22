import axios from "axios"
import { API } from "../utils/config"


export const login = user => {
    return axios.post(`${API}/users/signin`, user, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const register = user => {
    return axios.post(`${API}/users/signup`, user, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
export const changePasswod = (user,token) => {
    return axios.put(`${API}/users/changepassword`,user,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getAllProjects = (token) => {
    return axios.get(`${API}/projects/`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getsingleProjects = (token, id) => {
    return axios.get(`${API}/projects/${id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getAllMember = (token) => {
    return axios.get(`${API}/users/allmember`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getAllTeamLead = (token) => {
    return axios.get(`${API}/users/allTeamLead`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}



export const addProject = (data, token) => {
    return axios.post(`${API}/projects/create`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}

export const updateProject = (data, token) => {
    return axios.put(`${API}/projects/create`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}
export const updateSingleProject = ({member}, token, id) => {
    console.log(member);
    return axios.put(`${API}/projects/${id}`, member, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}



export const uploadFile = (data, token) => {
    return axios.put(`${API}/reports/upload`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}

export const createProject = (data, token) => {
    return axios.post(`${API}/projects/create`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}
export const createUser = (data, token) => {
    return axios.post(`${API}/users/createuser`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}
export const getAllReports = (token) => {
    return axios.get(`${API}/reports/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}
export const updateUser = (data, token, id) => {
    return axios.get(`${API}/users/${id}`, data,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}