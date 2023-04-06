import React from "react"
import { addUser, updateUser, deleteUser, filterUser, clearFilter } from "./config/Action"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
function App() {
    const dispatch = useDispatch()
    const villes = useSelector((state)=>state.villes)
    const users = useSelector((state)=>state.users)
    const count = users.length
    const [id, setId] =useState("")
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [ville, setVille] = useState(1)
    const [villeFilter, setVilleFilter] = useState(1)
    const handleAddUser = (e) => {
        e.preventDefault()
        dispatch(addUser(
            { id: count + 1, nom: nom, prenom: prenom, ville: ville }
        ))
        handleClear()
    }
    const handleUpdateUser = (e) => {
        e.preventDefault()

        dispatch(updateUser(
            { id, nom, prenom, ville }
        ))
        handleClear()
        setId("")
    }
    const handleClear = () => {
        setNom("")
        setPrenom("")
        setVille(1)
    }
    const handleUpdate = (id) => {
        const user = users.find((u) => u.id === parseInt(id))
        setId(id)
        setNom(user.nom)
        setPrenom(user.prenom)
        setVille(user.ville)
    }
    const handleDelete = (id) => {
        dispatch(deleteUser(id))
    }
    const handleFilter = () => {
        dispatch(filterUser(villeFilter))
    }
    const handleFilterClear = () => {
        dispatch(clearFilter())
    }
        
    return( <>
        <div className="container my-5">
            <div className="row d-flex justify-content-between">
                <div className="col-md-5 bg-light py-5 ">
                    <form>
                        <h1 className="text-center">Ajouter les utilisateures</h1>
                        <div className="mb-3">
                            <label htmlFor="#" className="form-label">Nom</label>
                            <input type="text" value={nom} className="form-control" onChange={(e) => setNom(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="#" className="form-label">Prenom</label>
                            <input type="text" value={prenom} className="form-control" onChange={(e) => setPrenom(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="#" className="form-label">Ville</label>
                            <select className="form-select" aria-label="Default select example" value={ville} onChange={(e) => setVille(parseInt(e.target.value))}>
                                {/* <option selected disabled>Choisir la ville ...</option> */}
                                {villes.map((v, index) => {
                                    return <option key={index} value={v.id}>{v.nom}</option>
                                })}
                            </select>
                        </div>
                        <div >
                            {!id ? (<button className="btn btn-primary me-3"
                                onClick={handleAddUser}>Enregistrer</button>)
                                : (<button className="btn btn-primary me-3"
                                    onClick={handleUpdateUser}>Valider</button>)}
                            <button className="btn btn-primary " onClick={() => handleClear()}>Clear</button>
                        </div>
                    </form>
                </div>


                {/* ---------------------------------- */}


                <div className="col-md-5 bg-light py-5">
                    <h1 className="text-center">Listes Utilisatures</h1>
                    <div className="">
                        <div className="mb-3">
                            <label htmlFor="#" className="form-label">Filtrer les utilisateurs par ville</label>
                            <select className="form-select mb-3" aria-label="Default select example" onChange={(e)=>setVilleFilter(e.target.value)} value={villeFilter}>
                                {villes.map((v,index)=>{
                                    return <option key={index} value={v.id}>{v.nom}</option>
                                })}
                                
                            </select>
                            <button className="btn btn-primary me-3" onClick={()=>handleFilter()}>Filtrer</button>
                            <button className="btn btn-primary" onClick={()=>handleFilterClear()}>Clear</button>
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prenom</th>
                                <th scope="col">Ville</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {users.map((user,index)=>{
                                const vs = villes.find((v)=>v.id === user.ville)
                                return(
                                    <tr key={index}>
                                        <th scope="row">{user.id}</th>
                                        <td>{user.nom}</td>
                                        <td>{user.prenom}</td>
                                        <td>{vs.nom}</td>
                                        <td >
                                            <div className="d-flex justify-content-evenly  ">
                                                <button className="border-0 btn btn-outline-secondary" onClick={()=>handleUpdate(user.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square text-warning" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </button>
                                                <button className="border-0 btn btn-outline-secondary" onClick={()=>handleDelete(user.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash text-danger " viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
    </>) 
}
export default App