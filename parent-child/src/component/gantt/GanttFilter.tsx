import React, { useState, useLayoutEffect } from 'react';

declare var gantt: GanttStatic;

const GanttFilter = () => {
    const [filter, setFilter] = useState(false);

    const handleFilter = () => {
        setFilter(!filter)
    };

    useLayoutEffect(() => {
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
        <button onClick={handleFilter}>filter</button>
    )
};

export default GanttFilter;
