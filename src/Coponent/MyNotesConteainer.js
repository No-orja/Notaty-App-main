import { Grid, Typography, IconButton, Stack, Snackbar, Alert } from "@mui/material";
import { Delete, Edit, CheckCircle, CheckCircleOutline } from "@mui/icons-material"; 
import Modal from '@mui/material/Modal';
import { useState } from "react";
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

//Thunk function
import { deleteNoteThunk, getAllNoteThunk, updateNoteThunk, completedNoteThunk} from "../Api/Notes/NotesThunk";

export default function MyNotesContainer({title, content, completed, id}) {

    const [isCompleted, setIsCompleted] = useState(completed);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [titleEdit, setTitleEdit] = useState(title);
    const [contentEdit, setContentEdit] = useState(content);

    //snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const dispatch = useDispatch();

    // Function to show snackbar message
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };
    
    // Edit logic
    const handleEditNote = async () => {
        if (!titleEdit.trim()) {
            showSnackbar("Title is required", "error");
            return;
        };
        await dispatch(updateNoteThunk({id: id, title: titleEdit, content: contentEdit}))
        .unwrap()
        .then(() => {
            setTitleEdit("");
            setContentEdit("");
            handleCloseEdit();  
            dispatch(getAllNoteThunk()); 
            setTimeout(() => {
                showSnackbar("Note Edited successfully", "success");
            }, 1000);
        })
        .catch((error) => {
            showSnackbar(error, "error");
        });
    };
    // Delete logic
    const handleDeleteToDo = async () => {
        console.log("Deleting note..."); 
        await dispatch(deleteNoteThunk(id))
            .unwrap()
            .then(async () => { 
                handleCloseDelete();
                await dispatch(getAllNoteThunk());
                showSnackbar("Note deleted successfully", "success");
            })
            .catch((error) => {
                console.log("Error:", error);
                showSnackbar(error, "error");
            });
    };

    // Complete logic
    console.log("pefore",isCompleted)
    const handleCompleteToDo = async () => {
        try {
            await dispatch(completedNoteThunk(id));
            dispatch(getAllNoteThunk());
            setIsCompleted(!isCompleted);
        } catch (error) {
            console.log("Error updating note:", error);
        }
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

    return (
        <div className="NoteContainer">
            {/* Snackbar for notifications */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={openEdit}
                onClose={handleCloseEdit}
                closeAfterTransition
            >
                <Box sx={style} >
                    <Typography id="spring-modal-title" variant="h6" component="h2" style={{ fontWeight:"bold" }}>
                        Edit Note
                    </Typography>
                    <input  
                        className="input" 
                        name="text" 
                        type="text" 
                        style={{margin:"10px"}}
                        value={titleEdit}
                        onChange={(e) => setTitleEdit(e.target.value)}
                    />
                    <input  
                        className="input" 
                        name="text" 
                        type="text" 
                        style={{margin:"10px"}}
                        value={contentEdit}
                        onChange={(e) => setContentEdit(e.target.value)}
                    />
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{ flexWrap: 'wrap' }}
                    >
                        <button className="icon-btn" style={{fontSize:"bold"}} onClick={handleEditNote}>
                            <div>Edit</div>
                        </button>
                        <button className="icon-btn" style={{backgroundColor: "#F1E7E9", fontSize:"bold"}} onClick={handleCloseEdit}>
                            <div>Cancel</div>
                        </button>                       
                    </Stack>
                </Box>
            </Modal>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={openDelete}
                onClose={handleCloseDelete}
                closeAfterTransition
            >
                <Box sx={style} >
                    <Typography id="spring-modal-title" variant="h6" component="h2" style={{ fontWeight:"bold" }}>
                        Are you sure you want to delete this ToDo?
                    </Typography>

                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{ flexWrap: 'wrap' }}
                    >
                        <button className="icon-btn" style={{fontSize:"bold"}} onClick={handleDeleteToDo}>
                            <div>Delete</div>
                        </button>
                        <button className="icon-btn" style={{backgroundColor: "#F1E7E9", fontSize:"bold"}} onClick={handleCloseDelete}>
                            <div>Cancel</div>
                        </button>                       
                    </Stack>
                </Box>
            </Modal>

            <Grid 
                container 
                spacing={2} 
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={6}>
                    <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#333" }}
                    >
                        {title}
                    </Typography>
                </Grid>

                {/* Control icons */}
                <Grid 
                    item 
                    xs={6} 
                    sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
                >
                    <IconButton color={isCompleted ? "success" : "default"} onClick={handleCompleteToDo}>
                        {isCompleted ? <CheckCircle /> : <CheckCircleOutline />}
                    </IconButton>
                    <IconButton color="primary" onClick={handleOpenEdit}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={handleOpenDelete}>
                        <Delete />
                    </IconButton>
                </Grid>

                <Grid item xs={6}>   
                    <Accordion sx={{ border: "3px solid #877575", borderRadius: "8px", boxShadow: 3 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                borderRadius: "8px 8px 0 0",    
                            }}
                        >
                            <Typography component="span">Details</Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ backgroundColor: "#f5f5f5", color: "#333", padding: "16px" }}>
                            {content !== "" ? content : "No content"}
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
}
