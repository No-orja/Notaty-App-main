import { Box, Container, Tab, Tabs } from "@mui/material";
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// images icon
import done_togglle from "../Images/seymbols/check-mark.png";
import all from "../Images/seymbols/all.png";
import pending_toggle from "../Images/seymbols/time-left.png";

// images page
import time from "../Images/seymbols/Time management.gif";
import done from "../Images/seymbols/Done.gif";
import create from "../Images/seymbols/Notes.gif";

// Redux
import { addTodoThunk, getAllTodoesThunk } from "../Api/ToDoes/ToDoesThunk";
import { selectToDoes, selectGetAllTodosStatus, selectGetAllTodosError } from "../Api/ToDoes/TodoSelector";
import MyToDoesContainer from "./MyToDoesContainer";

export default function MyToDos() {
  const [allTodos, setAllTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const dispatch = useDispatch();

  const TODOS = useSelector(selectToDoes);
  const GetAllToDoesStatus = useSelector(selectGetAllTodosStatus);
  const GetAllToDoesError = useSelector(selectGetAllTodosError);

  useEffect(() => {
    if (GetAllToDoesStatus === "idle") {
      dispatch(getAllTodoesThunk());
    }
  }, [dispatch, GetAllToDoesStatus]);

  useEffect(() => {
    if (GetAllToDoesStatus === "succeeded" && Array.isArray(TODOS) && TODOS.length > 0) {
      setAllTodos(TODOS);
      setCompletedTodos(TODOS.filter(todo => todo.isCompleted));
      setPendingTodos(TODOS.filter(todo => !todo.isCompleted));
    } else if (GetAllToDoesError) {
      showSnackbar(GetAllToDoesError, "error");
    }
  }, [dispatch, GetAllToDoesStatus, TODOS, GetAllToDoesError]);

  const handleSaveCreateTodo = () => {
    if (!title.trim()) {
      showSnackbar("Title is required", "error");
      return;
    }

    const newTodo = {
      task: title,
      isCompleted: false
    };

    dispatch(addTodoThunk(newTodo))
      .unwrap()
      .then(() => {
        showSnackbar("Todo added successfully!", "success");
        setTitle("");
        dispatch(getAllTodoesThunk());
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        showSnackbar("Failed to add todo!", "error");
      });
  };

  return (
    <Container maxWidth="md">
      <div className="NotesContainer">
        <div style={{ padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <input
                placeholder="Type here..."
                className="input"
                name="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <button className="icon-btn" onClick={handleSaveCreateTodo}>
                <div>Add TODO</div>
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
                  (allTodos.length > 0 ? (
                    allTodos.slice().reverse().map((todo) => (
                      <MyToDoesContainer
                        key={todo._id}
                        task={todo.task}
                        completed={todo.isCompleted}
                        id={todo._id}
                      />
                    ))
                  ) : (
                    <img src={create} style={{ width: "30%", display: "block", margin: "auto" }} alt="Note" />
                  ))}
                {value === 1 &&
                  (completedTodos.length > 0 ? (
                    completedTodos.slice().reverse().map((todo) => (
                      <MyToDoesContainer
                        key={todo._id}
                        task={todo.task}
                        completed={todo.isCompleted}
                        id={todo._id}
                      />
                    ))
                  ) : (
                    <img src={done} style={{ width: "30%", display: "block", margin: "auto" }} alt="Note" />
                  ))}
                {value === 2 &&
                  (pendingTodos.length > 0 ? (
                    pendingTodos.slice().reverse().map((todo) => (
                      <MyToDoesContainer
                        key={todo._id}
                        task={todo.task}
                        completed={todo.isCompleted}
                        id={todo._id}
                      />
                    ))
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
  );
}
