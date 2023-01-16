import React from "react";


import DayListItem from './DayListItem';

export default function DayList(props) {
  const { days, value, onChange } = props;

  return (
    <ul>
      {days.map(x => (
        <DayListItem
          key={x.id}
          name={x.name}
          spots={x.spots}
          selected={x.name === value}
          setDay={onChange}
        />
      ))}
    </ul>
  );
};