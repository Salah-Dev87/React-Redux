export const addUser = (user)=>{
    return{type:"Add_User", payload:user}
}
export const updateUser = (user)=>{
    return{type:"Update_User", payload:user}
}
export const deleteUser = (idUser)=>{
    return{type:"Delete_User", payload:idUser}
}
export const filterUser = (idVille)=>{
    return{type:"Filter_User", payload:idVille}
}
export const clearFilter = () =>{
    return{type:"Clear_Filter"}
}