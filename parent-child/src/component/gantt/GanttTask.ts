
interface GanttTask {
    id: string;
    text: string;
    start_date: Date;
    parent?: string;
    duration: number;
    progress: number;
    priority: string;
}

export default GanttTask;