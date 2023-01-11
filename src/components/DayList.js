import React from "react";


import DayListItem from './DayListItem';

export default function DayList(props) {
  const dayList = props.days.map(day => {
    const dayObj = {
      key: day.id,
      name: day.name,
      spots: day.spots,
      selected: day.name === props.value,
      setDay: props.onChange
    }
    return (
      <DayListItem {...dayObj} />
    );
  });
  return (
    <ul>
      {dayList}
    </ul>
  );
};