



export default function InterviewerList(props) {
 const interviewerList = props.interviewers.map(interviewer => {
  const interviewersObj = {
    key: interviewer.id,
    name: interviewer.name,
    avatar: interviewer.avatar,
    selected: interviewer.id === props.value,
    setInterviewer: props.onChange
    setInterviewer={() => props.onChange(interviewer.id)}
  }
 )};

return (
  <InterviewerListItem {...interviewerObj} />
);

<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list"></ul>
</section>