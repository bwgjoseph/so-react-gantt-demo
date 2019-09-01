import React, { useState, useEffect, useLayoutEffect } from 'react';
import GanttChart from './GanttChart';
import { useFetchEvent } from './useFetchEvent';
import GanttFilter from './GanttFilter';

declare var gantt: GanttStatic;

const Gantt: React.FC = () => {

    // Toggle the state.loading below to see the difference in UI
    // With state.loading commented, the UI behavior is correct
    // With state.loading in play, the UI upon filter will have an empty row
    // and clicking on the filter button again will cause #Task 1 and #Task 2
    // to display on the same row

    const [state] = useFetchEvent();
    const [filter, setFilter] = useState(false);

    const handleFilter = () => {
        setFilter(!filter)
    };

    // Using useLayoutEffect in child component will have the blank row issue after filter
    useEffect(() => {
        const onBeforeTaskDisplay = gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {
            console.log("filters", task.text, filter)
            if (filter && task.duration > 4) {
                return false;
            }
            return true;
        });
        gantt.refreshData();

        // This should have been here
        return () => {
            gantt.detachEvent(onBeforeTaskDisplay);
        }
    }, [filter])

    return (
    <>
        {state.loading ?
            (<div>Loading ...</div>) :
            (
          <>
            <button onClick={handleFilter}>filter</button>
            <GanttChart />
          </>
            )
        }
    </>
    )
};

export default Gantt;