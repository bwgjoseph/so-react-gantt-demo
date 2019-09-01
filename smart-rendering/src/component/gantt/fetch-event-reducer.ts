import GanttTask from "./GanttTask";

interface State {
    data: GanttTask[];
    loading: boolean;
    error: boolean;
}

type Action =
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: GanttTask[] }
  | { type: 'FETCH_ERROR' }

const fetchEventReducer = (state: State, action: Action) => {
    console.log(action.type);
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                loading: true,
                error: false
            };
        case 'FETCH_SUCCESS':
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload,
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            throw new Error('error');
    }
};

export {
    fetchEventReducer
}