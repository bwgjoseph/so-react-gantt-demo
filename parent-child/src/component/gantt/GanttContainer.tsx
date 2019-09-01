import React, { useState, useEffect, useLayoutEffect } from 'react';
import GanttChart from './GanttChart';
import { useFetchEvent } from './useFetchEvent';
import GanttFilter from './GanttFilter';

declare var gantt: GanttStatic;

const Gantt: React.FC = () => {

    // First run with this setting where filter code are in this parent component
    // The result is that all are displayed correctly
    // Next comment out codes from // Commout out from here to // to here
    // and enable <GanttFilter /> component
    // Run it again, and this time, the UI will have the UI issue

    const [state] = useFetchEvent();

    // Commout out from here
    // const [filter, setFilter] = useState(false);

    // const handleFilter = () => {
    //     setFilter(!filter)
    // };

    // Using useLayoutEffect in child component will have the blank row issue after filter
    // But using in parent component will not
    // useLayoutEffect(() => {
    //     const onBeforeTaskDisplay = gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
    //         console.log("filters", task.text, filter)
    //         if (filter && task.duration > 4) {
    //             return false;
    //         }
    //         return true;
    //     });
    //     gantt.refreshData();

    //     // This should have been here
    //     return () => {
    //         gantt.detachEvent(onBeforeTaskDisplay);
    //     }
    // }, [filter])
    // to here

    return (
    <>
        {state.loading ?
            (<div>Loading ...</div>) :
            (
          <>
            {/* and load GanttFilter child component instead */}
            <GanttFilter />
            {/* <button onClick={handleFilter}>filter</button> */}
            <GanttChart />
          </>
            )
        }
    </>
    )
};

export default Gantt;