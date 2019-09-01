import React, { useState, useEffect, useLayoutEffect } from 'react';
import GanttChart from './GanttChart';
import { useFetchEvent } from './useFetchEvent';
import GanttFilter from './GanttFilter';

declare var gantt: GanttStatic;

const Gantt: React.FC = () => {

    // Toggle smart_rendering to true or false in GanttChart.tsx to see the difference
    // false - no UI rendering issue
    // true (default) - blank row

    const [state] = useFetchEvent();
    const [filter, setFilter] = useState(false);

    const handleFilter = () => {
        setFilter(!filter)
    };

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