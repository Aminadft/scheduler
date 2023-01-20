import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText } from "@testing-library/react";

import axios from "_mocks_/axios";

import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    console.log(fireEvent.click(getByText("Wednesday")));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and decreases the spots remaining for Monday by 1", async () => {
    // app rendering
    const { container, debug } = render(<Application />);
    // wait until "Archie Cohen" is displayed. This will happen after GET req
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    //get the first appointment>>>
    const appointment = appointments[0];
    //event of clicking the add button takes place resulting in fireevnt
    fireEvent.click(getByAltText(appointment, "Add"));
    //student name addition
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // click on an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // save the new interview appointment and do a PUT request
    fireEvent.click(getByText(appointment, "Save"));

    // Access the debug function returned by the render function. After the event is fired to simulate the click of the "Save" button, use the debug() function to output the current state of the DOM.
    // debug()

    // check Saving status is showing after clicking on Save
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // different ways to wait for Saving Status to complete and Show the Student name. mode changes from SAVING to SHOW.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    console.log(prettyDOM(day));
    // console.log(prettyDOM(appointment));
  });

  //    it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  //   // 1. Render the Application.
  //      const { container, debug  } = render(<Application />);
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //      await waitForElement(() => getByText(container, "Archie Cohen"));
  //  // 3. Click the "Delete" button on the booked appointment.
  //      const appointment = getAllByTestId(container, "appointment").find(
  //        appointment => queryByText(appointment, "Archie Cohen")
  //      );

  //      fireEvent.click(queryByAltText(appointment, "Delete"));
  //      //Check that the confirmation message is shown.
  //      expect(getByText(appointment, "Confirm to DELETE this Appointment.")).toBeInTheDocument();
  //  // Click the "Confirm" button on the confirmation
  //      fireEvent.click(queryByText(appointment, "Confirm"));
  //      //Check that the element with the text "Deleting" is displayed.
  //      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  //      //Wait until the element with the "Add" button is displayed
  //      await waitForElement(() => getByAltText(appointment, "Add"));


  //      // await waitForElement(() => getByAltText(appointment, "Add"));
  //      const day = getAllByTestId(container, "day").find(day =>
  //        queryByText(day, "Monday")
  //      );
  //      //Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  //      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  //    });


  //    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  //      //  Render the Application.
  //     const { container } = render(<Application />);
  //      await waitForElement(() => getByText(container, "Archie Cohen"));

  //      const appointment = getAllByTestId(container, "appointment").find(
  //        appointment => queryByText(appointment, "Archie Cohen")
  //      );

  //      fireEvent.click(queryByAltText(appointment, "Edit"));
  //      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //      fireEvent.click(getByText(appointment, "Save"));

  //      expect(getByText(appointment, "Saving")).toBeInTheDocument();

  //      await waitForElement(() => getByText(container, "Archie Cohen"))

  //      expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();

  //      const day = getAllByTestId(container, "day").find(day => 
  //        queryByText(day, "Monday")
  //      );
  //      expect(getByText(day, "1 spot remaining"))
  //    });


  //    it("shows the save error when failing to save an appointment", async() => {
  //      axios.put.mockRejectedValueOnce();
  //      const { container } = render(<Application />)
  //      await waitForElement(() => getByText(container, "Archie Cohen"))

  //      const appointment = getAllByTestId(container, "appointment").find(
  //        appointment => queryByText(appointment, "Archie Cohen")
  //      );

  //      fireEvent.click(queryByAltText(appointment, "Edit"));
  //      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //      fireEvent.click(getByText(appointment, "Save"));

  //      await waitForElement(() => getByText(appointment, "Error"));
  //      expect(getByText(appointment, "Error")).toBeInTheDocument();

  //      fireEvent.click(queryByAltText(appointment, "Close"));

  //      expect(getByText(appointment, "Save")).toBeInTheDocument();

  //      fireEvent.click(queryByText(appointment, "Cancel"))

  //      expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

  //      const day = getAllByTestId(container, "day").find(day =>
  //          queryByText(day, "Monday")
  //        );

  //      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  //    });


  //    it("shows the delete error when failing to delete an existing appointment", async () => {
  //      axios.delete.mockRejectedValueOnce();
  //      const { container } = render(<Application />);
  //      await waitForElement(() => getByText(container, "Archie Cohen"));

  //      const appointment = getAllByTestId(container, "appointment").find(
  //        appointment => queryByText(appointment, "Archie Cohen")
  //      );
  //      fireEvent.click(queryByAltText(appointment, "Delete"))

  //      expect(getByText(appointment, "Confirm to DELETE this Appointment.")).toBeInTheDocument();

  //      fireEvent.click(queryByText(appointment, "Confirm"))

  //      expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  //      await waitForElement(() => getByText(appointment, "Error"));
  //      expect(getByText(appointment, "Error")).toBeInTheDocument();

  //      const day = getAllByTestId(container, "day").find(day =>
  //        queryByText(day, "Monday")
  //      );

  //      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  //    });

});