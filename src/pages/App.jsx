import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Switch,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { todoList } from "../data/dummyData";
import { useEffect, useState } from "react";
import TodoModal from "../components/TodoModal";

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : todoList;
  });
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();
  const [modalType, setModalType] = useState();

  const handleOpenEditModal = (todo) => {
    setModalType("edit");
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleOpenDeleteModal = (todo) => {
    setModalType("delete");
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleOpenAddModal = () => {
    setModalType("add");
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const switchHandler = (e, todo) => {
    const newList = todos.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = e.target.checked;
        return item;
      }
      return item;
    });

    setTodos(newList);
  };

  const updateHandler = (todo) => {
    const newList = todos.map((item) => {
      if (item.id === todo.id) {
        item = { id: item.id, ...todo };
        console.log(item);
        return item;
      }
      return item;
    });

    setTodos(newList);
    handleClose();
  };

  const addHandler = (todo) => {
    const lastId = todos[todos.length - 1].id;

    const newList = [...todos, { id: lastId + 1, ...todo }];

    setTodos(newList);
    handleClose();
  };

  const deleteHandler = (todo) => {
    const newList = todos.filter((item) => item.id !== todo.id);

    setTodos(newList);
    handleClose();
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div>
          <h1 className={classes.text}>Todo List</h1>
        </div>
        <div>
          <div>
            <Button variant="contained" onClick={handleOpenAddModal}>
              Add New
            </Button>
          </div>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} className={classes.listItem}>
                <Grid container sx={{ width: "100%" }}>
                  <Grid size={{ xs: 7, md: 8 }}>
                    <ListItemText
                      primary={todo.title}
                      secondary={todo.description}
                    />
                  </Grid>
                  <Grid size={{ xs: 5, md: 4 }}>
                    <Switch
                      edge="end"
                      checked={todo.isCompleted}
                      onChange={(e) => switchHandler(e, todo)}
                    />
                    <IconButton onClick={() => handleOpenEditModal(todo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon onClick={() => handleOpenDeleteModal(todo)} />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      {open && (
        <TodoModal
          open={open}
          handleClose={handleClose}
          modalType={modalType}
          todo={selectedTodo}
          updateHandler={updateHandler}
          addHandler={addHandler}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    background: "#fff",
    padding: 20,
    borderRadius: 20,
    margin: 50,
    [theme.breakpoints.down("md")]: {
      margin: "50px 10px",
      padding: 10,
    },
  },
  button: {
    width: "300px",
  },
  text: {
    margin: "10px 0px",
    textAlign: "center",
  },
  listItem: {
    padding: "8px !important",
  },
}));

export default App;
