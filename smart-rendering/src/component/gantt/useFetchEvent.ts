import { useReducer, useEffect } from "react";
import { fetchEventReducer } from "./fetch-event-reducer";
import GanttTask from "./GanttTask";

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const useFetchEvent = () => {
    const [state, dispatch] = useReducer(fetchEventReducer, {
        data: [] as GanttTask[],
        loading: false,
        error: false,
    });

    useEffect(() => {
        let cancel = false;

        const init = async () => {
            dispatch({ type: 'FETCH_INIT' });
            try {
                // Simulate a fetch event
                await sleep(1000);
                if (!cancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: [] as GanttTask[] });
                }
            } catch (err) {
                if (!cancel) {
                    dispatch({ type: 'FETCH_ERROR' });
                }
            }
        }

        init();

        return () => {
            cancel = true;
        };
    }, []);

    return [state];
};

export {
    useFetchEvent
}