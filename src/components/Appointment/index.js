import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


import "./styles.scss";

// Main container for appointment 
export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    console.log('Saving...');

    // Form onSave will create a new interview object and call bookInterview
    const id = props.id;
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    // Pass the interview data to bookInterview updates appointment API
    props.bookInterview(id, interview)
      .then(() => transition(SHOW)) // After bookInterview PUT request completes, it will transition to SHOW mode
      .catch(() => transition(ERROR_SAVE, true));
  };

  // delete an appointment
  const onDelete = () => {

    transition(CONFIRM);
  };



  // confirm delete appoinment
  const destroy = () => {
    //prompt of deleting pops up 
    transition(DELETING, true);
    // const id = props.id

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      // appointment will be EMPTYthereafter
      .catch(() => transition(ERROR_DELETE, true));
  };


  //edit function
  const onEdit = () => {
    transition(EDIT);
  };





  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {mode === ERROR_SAVE && <Error message="Cannot Save Appointment" onClose={() => transition(EMPTY, true)} />}
      {mode === ERROR_DELETE && <Error message="Cannot Delete Appointment" onClose={() => transition(SHOW, true)} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={() => { back(); }} />}
      {mode === CONFIRM && <Confirm onConfirm={destroy} onCancel={() => back()} message="Confirm to DELETE this Appointment." />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
