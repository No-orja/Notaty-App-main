import { Box, Container, Modal, Stack, Typography, Tabs, Tab, Snackbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import React from 'react';
import MuiAlert from '@mui/material/Alert';

//images icone
import done_togglle from "../Images/seymbols/check-mark.png";
import all from "../Images/seymbols/all.png";
import pending_toggle from "../Images/seymbols/time-left.png";

//image page
import time from "../Images/seymbols/Time management.gif"
import done from "../Images/seymbols/Done.gif"
import create from "../Images/seymbols/Notes.gif"

import Loader from "./utils/Loader";
import MyNotesContainer from "./MyNotesConteainer";

import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllNoteThunk, addNoteThunk} from "../Api/Notes/NotesThunk";
import { 
  // selectCreateNoteError, 
  // selectCreateNoteStatus,
  selectNote,
  selectGetAllNotesError, 
  selectGetAllNotesStatus 
} from "../Api/Notes/NoteSelectore";
//Toast
import { ToastContainer } from "react-toastify";
import Toastify from "./utils/Toastify";

export default function MyToDos() {
  
    const [allNotes, setAllNotes] = useState([]);
    const [completedNotes, setCompletedNotes] = useState([]);
    const [pendingNotes, setPendingNotes] = useState([]);

    const [value, setValue] = useState(0);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createOpen, setCreateOpen] = useState(false);

      // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const showSnackbar = (message, severity = "success") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    };


    const dispatch = useDispatch()
    
    const NOTES = useSelector(selectNote);

    const GetAllNotesStatus = useSelector(selectGetAllNotesStatus);
    const GetAllNotesError = useSelector(selectGetAllNotesError);

    // const createNoteStatus = useSelector(selectCreateNoteStatus);
    // const createNoteError = useSelector(selectCreateNoteError);

    const handleCloseCreate = () => setCreateOpen(false);
    const handleOpenCreate = () => setCreateOpen(true);
    
    useEffect(() => {
      if (GetAllNotesStatus === "idle") {
        dispatch(getAllNoteThunk());
      }
    }, [dispatch, GetAllNotesStatus]);
    
    useEffect(() => {
      
      if (GetAllNotesStatus === "succeeded" && NOTES.length > 0) {
        setAllNotes(NOTES);
        setCompletedNotes(NOTES.filter(note => note.completed));
        setPendingNotes(NOTES.filter(note => !note.completed));
    
        console.log("🔹 All Notes:", NOTES);
        console.log("✅ Completed Notes:", NOTES.filter(note => note.completed));
        console.log("⏳ Pending Notes:", NOTES.filter(note => !note.completed));
      } else if (GetAllNotesError) {
        console.error("❌ Error fetching notes:", GetAllNotesError);
      }
    }, [NOTES, GetAllNotesStatus, GetAllNotesError]);

    //Create:
    const handleSaveCreateNote = async () => {
      
      if (!title.trim()) return;
      
      const newNote = { title, content, completed: false };
  
      dispatch(addNoteThunk(newNote))
        .unwrap()
        .then(() => {
          setTitle("");
          setContent("");
          dispatch(getAllNoteThunk()); 
          showSnackbar("Note created successfully", "success");
          handleCloseCreate();
        })
        .catch((error) => {
          Toastify(error, "error");
        });
  };
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #D32F2F',
      boxShadow: 24,
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      gap: "20px"
    };


    return(
        <Container maxWidth="md">
          <ToastContainer/>
          {GetAllNotesStatus === "loading" && <Loader />}
          
          <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={createOpen}
                onClose={handleCloseCreate}
                closeAfterTransition
              >
                <Box sx={style} >
                    <Typography id="spring-modal-title" variant="h6" component="h2" style={{ fontWeight:"bold"}}>
                        Create Note
                    </Typography>
                    <input 
                        placeholder="Title" 
                        className="input" 
                        name="text" 
                        type="text" 
                        style={{margin:"10px"}}
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <input 
                        placeholder="Body" 
                        className="input" 
                        name="text" 
                        type="text" 
                        style={{margin:"10px"}}
                        value={content}
                        onChange={(e)=>setContent(e.target.value)}
                    />
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{ flexWrap: 'wrap' }}
                    >
                        <button className="icon-btn" style={{fontSize:"bold"}} onClick={handleSaveCreateNote}>
                            <div>Create</div>
                        </button>
                        <button className="icon-btn" style={{backgroundColor: "#F1E7E9", fontSize:"bold"}} onClick={handleCloseCreate}>
                            <div>Cancel</div>
                        </button>                       
                    </Stack>
                  </Box>
          </Modal>

          <div className="NotesContainer">
            <div style={{ padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <button className="icon-btn-notes" onClick={handleOpenCreate}>
                    <div>Add Note</div>
                  </button>
                </Grid>

                <Grid item xs={12}>
                  
                  <Tabs
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    centered
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab icon={<img src={all} alt="All Notes" width={24} />} label="All" />
                    <Tab icon={<img src={done_togglle} alt="Completed" width={24} />} label="Completed" />
                    <Tab icon={<img src={pending_toggle} alt="Pending" width={24} />} label="Pending" />
                  </Tabs>

                  <Box sx={{ mt: 2 }}>
                    {value === 0 &&
                      (allNotes.length > 0 ? (
                        allNotes.slice().reverse().map((note) => <MyNotesContainer key={note._id} title={note.title} content={note.content} completed={note.completed} id={note._id}/>)
                      ) : (
                        <img src={create} style={{ width: "30%", display: "block", margin: "auto" }} alt="Note" />
                      ))}
                    {value === 1 &&
                      (completedNotes.length > 0 ? (
                        completedNotes.slice().reverse().map((note) => <MyNotesContainer key={note._id} title={note.title} content={note.content} completed={note.completed} id={note._id}/>)
                      ) : (
                        <img src={done} style={{ width: "30%", display: "block", margin: "auto" }} alt="Note" />
                      ))}
                    {value === 2 &&
                      (pendingNotes.length > 0 ? (
                        pendingNotes.slice().reverse().map((note) => <MyNotesContainer key={note._id} title={note.title} content={note.content} completed={note.completed} id={note._id}/>)
                      ) : (
                        <img src={time} style={{ width: "30%", display: "block", margin: "auto" }} alt="Note" />
                        
                      ))}
                  </Box>

                </Grid>
          
              </Grid>
            </div>
          </div>
          
          {/* ✅ Snackbar component */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <MuiAlert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              elevation={6}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
      </Container>
    )
}