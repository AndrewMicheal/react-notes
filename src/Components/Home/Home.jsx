import axios from 'axios'
import React , {useState , useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
const Home = () => {
    const [notes, setNotes] = useState([])
    const [again ,setAgain] = useState(0)
    const [noteId ,setNoteId] = useState("")
    let token = localStorage.getItem("token");
    let userID;
    
    useEffect(() => {
        getAllNotes()
    }, [])
    useEffect(() => {
        getAllNotes()
    }, [again])
    try {
        let decoded = jwt_decode(token);
        userID = decoded._id;
    } catch (error) {
        localStorage.clear();
        return <Redirect to = "/login" />
    }
    let notesData = {
        title : "" ,
        desc : "" ,
        userID : userID ,
        token : token
    }

    async function getAllNotes() {
        let {data} = await axios.get("https://route-egypt-api.herokuapp.com/getUserNotes",{
            headers: {
                userID , 
                token
            }
        })
        if(data.message === "success") {
            setNotes(data.Notes);
            console.log(notes)
        }
    }
     async function sendData(e) {
         e.preventDefault();
         e.target.reset();
        let {data} = await axios.post("https://route-egypt-api.herokuapp.com/addNote",notesData)
        if(data.message === "success") {
            setAgain(Math.random());
        }
    }
    function getNotes({target}) {
        notesData[target.name] = target.value;
    }
    async function editNote(e) {
        e.preventDefault();
        e.target.reset();
        let {data} = await axios.put("https://route-egypt-api.herokuapp.com/updateNote",{
                "title" : notesData.title , 
                "desc" : notesData.desc ,
                "NoteID" : noteId ,
                "token" : token
            
        })
        if(data.message === "updated") {
            setAgain(Math.random());
        }
    }
    async function deleteNote(id) {
        let {data} = await axios.delete("https://route-egypt-api.herokuapp.com/deleteNote",{
            data:{
                "NoteID" : id ,
                "token" : token
            }
        })
        if(data.message === "deleted") {
            setAgain(Math.random());
        }
    } 
    return (
        <>
           <div className="container my-5">
        <div className="col-md-12 m-auto text-right">
            <a className="add p-2 btn" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
        New</a>
        </div>
    </div>


    {/* <!-- Modal --> */}
    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
       
            <div className="modal-dialog">
                <form onSubmit = {sendData}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
                    </div>
                    <div className="modal-body">
                        <input onKeyUp = {getNotes} name = "title" placeholder="Type Title" name="title" className="form-control" type="text"/>
                        <textarea onKeyUp = {getNotes} name = "desc" className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type = "submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                    </div>
                </div>
                </form>
            </div>
      
    </div>



    {/* <!-- ==========================Notes=============================== --> */}

    <div className="container">
        <div className="row">
            {notes.map((note,index)=>{
                return(
                    <div className="col-md-4 my-4" key = {index}>
                        <div className="note p-4">
                            <h3 className="float-left">{note.title}</h3>
                            <a data-toggle="modal" data-target="#exampleModal2" onClick = {()=>setNoteId(note._id)}><i className="fas fa-edit float-right edit"></i></a>
                            <a onClick = {()=>deleteNote(note._id)}> <i className="fas fa-trash-alt float-right px-3 del"></i></a>
                            <span className="clearfix"></span>
                            <p>{note.desc}</p>
                        </div>
                </div>
                
                );
            })}
        </div>
            {/* <!-- update Modal --> */}
        <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <form onSubmit = {editNote}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input onChange = {getNotes}  name = "title" placeholder="Type Title" name="title" className="form-control" type="text"/>
                        <textarea onChange = {getNotes}  name = "desc" className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type = "submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Edit Note</button>
                    </div>
                </div>
                </form>
            </div>
        
        </div>
    </div>
    </>
    )
}

export default Home
