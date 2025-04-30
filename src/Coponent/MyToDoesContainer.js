import { Grid, Typography, IconButton, Stack } from "@mui/material";
import { Delete, Edit, CheckCircle } from "@mui/icons-material"; 
import Modal from '@mui/material/Modal';
import { Snackbar} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { deleteToDoesThunk, getAllTodoesThunk, updateToDoesThunk , toggleCompletedToDoesThunk} from "../Api/ToDoes/ToDoesThunk";

export default function MyToDoesContainer({task, completed, id}) {

    const dispatch = useDispatch();

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [titleEdit, setTitleEdit] = useState(task);

    const [isCompleted, setIsCompleted] = useState(completed);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const showSnackbar = (message, severity = "success") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
      };
      
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const handleEditToDo = async ()=>{
        if(!titleEdit.trim()){
            showSnackbar("Title is required", "error");
            return;
        }
        await dispatch(updateToDoesThunk({id: id, task: titleEdit}))
        .unwrap()
        .then(() => {
            setTitleEdit("");
            handleCloseEdit();  
            dispatch(getAllTodoesThunk()); 
            setTimeout(() => {
                showSnackbar("ToDo Edited successfully", "success");
            }, 1000);
        })
        .catch((error) => {
            showSnackbar(error, "error");
        });

        handleCloseEdit();
    }
    
    // Delete logic
    const handleDeleteToDo = async () => {
      
        await dispatch(deleteToDoesThunk(id))
          .unwrap()
          .then(async () => {
            handleCloseDelete();
            await dispatch(getAllTodoesThunk());
            setTimeout(() => {
              showSnackbar("ToDo Deleted successfully", "success");
            }, 1000);
          })
          .catch((error) => {
            console.error("❌ Delete error:", error);
            showSnackbar(error?.message || "Something went wrong", "error");
          });
    };
      
    const handleCompleteToDo = ()=>{
        handleCloseEdit();
        setIsCompleted(!isCompleted);
        dispatch(toggleCompletedToDoesThunk(id));
    }

    console.log("isCompleted", isCompleted);
    console.log("task", task);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #D32F2F',
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        gap: "20px",
      
        // ——— التعديل هنا ———
        width: {
          xs: '90vw',   // على الموبايل العرض رح يكون 90% من عرض الشاشة
          sm: 400       // من حجم sm وطالع (≥600px) العرض ثابت 400px
        },
        maxWidth: '95vw'  // تأكد إنّه ما يتجاوز 95% من عرض الشاشة حتى على الشاشات الضخمة
      };
      

    return (
        <div className="NoteContainer">

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={openEdit}
                onClose={handleCloseEdit}
                closeAfterTransition

              >
                <Box sx={style} >
                    <Typography id="spring-modal-title" variant="h6" component="h2" style={{ fontWeight:"bold"}}>
                        Edit ToDo
                    </Typography>
                    <input 
                        placeholder="Type here..." 
                        className="input" 
                        name="text" 
                        type="text" 
                        style={{margin:"10px"}}
                        value={titleEdit}
                        onChange={(e)=>setTitleEdit(e.target.value)}
                    />
                    <Stack
                        spacing={{ xs: 1, sm: 2 }}
                        direction="row"
                        useFlexGap
                        sx={{ flexWrap: 'wrap' }}
                    >
                        <button className="icon-btn" style={{fontSize:"bold"}} onClick={handleEditToDo}>
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
                onClose={handleCloseEdit}
                closeAfterTransition
              >
                <Box sx={style} >
                    <Typography id="spring-modal-title" variant="h6" component="h2" style={{ fontWeight:"bold"}}>
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
                <Grid item xs={12} sm={6}>
                    <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#333" }}
                    >
                        {task}
                    </Typography>
                </Grid>

                {/* أيقونات التحكم */}
                <Grid 
                    item 
                    xs={12} sm={6} 
                    sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
                >
                    <IconButton color="success" onClick={handleCompleteToDo}>
                        {isCompleted ? <CheckCircle /> : <CheckCircle color="disabled" />}
                    </IconButton>
                    <IconButton color="primary" onClick={handleOpenEdit}>
                        <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={handleOpenDelete}>
                        <Delete />
                    </IconButton>

                </Grid>
            </Grid>

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


        </div>
    );
}
