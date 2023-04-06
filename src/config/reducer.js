const initialeState = {
    villes:[
        {id:1, nom:"Agadir"},
        {id:2, nom:"Casa"},
        {id:3, nom:"Tiznit"}
    ],
    users:[
        {id:1, nom:"Mohamed", prenom:"Amin", ville:3},
        {id:2, nom:"Morad", prenom:"Yassin", ville:1},
    ]
}
const reducer =(state=initialeState,action)=>{
    switch (action.type){
        case "Add_User":
            return{...state,users:[...state.users,action.payload]}
        case "Update_User":
            const user = state.users.find((u)=>u.id ===parseInt(action.payload.id))
            if(user){
                user.nom = action.payload.nom
                user.prenom = action.payload.prenom
                user.ville = action.payload.ville
            }
            return state
        case "Delete_User":
            return{...state,users:[...state.users.filter((u)=>u.id!== parseInt(action.payload))]}
        case "Filter_User":
            return{...state, users:initialeState.users.filter((u)=>u.ville==parseInt(action.payload))}
        case "Clear_Filter":
            return{...state, users:initialeState.users}
        default:
            return state
    }   
}
export default reducer