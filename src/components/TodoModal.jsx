import { Button, Modal, Switch, TextField } from "@mui/material";
import CustomInput from "./CustomInput";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { todoSchema } from "../util/validation";

function TodoModal(props) {
  const {
    open,
    handleClose,
    modalType,
    todo,
    updateHandler,
    addHandler,
    deleteHandler,
  } = props;
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: modalType === "edit" ? todo?.title : "",
      description: modalType === "edit" ? todo?.description : "",
      isCompleted: modalType === "edit" ? todo?.isCompleted : false,
    },
    validationSchema: todoSchema,
    onSubmit: (values) => {
      modalType === "edit"
        ? updateHandler({ id: todo.id, ...values })
        : addHandler(values);
    },
  });
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.container}>
        <div>
          <h2 className={classes.text}>
            {modalType === "edit"
              ? "Update Todo"
              : modalType === "add"
              ? "Add New Todo"
              : "Delete todo"}
          </h2>
        </div>
        {modalType === "delete" ? (
          <div>Are you sure you want to delete this {todo.title} task?</div>
        ) : (
          <div>
            <div className={classes.inputDiv}>
              <div>Title</div>
              <CustomInput
                placeholder="Enter title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </div>
            <div className={classes.inputDiv}>
              <div>Description</div>
              <TextField
                className={classes.input}
                placeholder="Enter description"
                name="description"
                value={formik.values.description}
                multiline={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </div>
            <div className={classes.inputDiv}>
              <div>Status</div>
              <Switch
                name="isCompleted"
                checked={formik.values.isCompleted}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        )}
        <div className={classes.buttonDiv}>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          {modalType === "delete" && (
            <Button variant="contained" onClick={() => deleteHandler(todo)}>
              Delete
            </Button>
          )}
          {modalType !== "delete" && (
            <Button variant="contained" onClick={formik.handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

const useStyles = makeStyles(() => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    boxShadow: 24,
    background: "#fff",
    padding: 20,
    borderRadius: 20,
  },
  input: {
    width: "300px",
    "& .MuiInputBase-root": {
      margin: "10px 0px",
    },
  },
  inputDiv: {
    margin: "20px 0px",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0px",
  },
  text: {
    margin: "10px 0px",
    textAlign: "center",
  },
}));

export default TodoModal;
