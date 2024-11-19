const SimplifiedTaskDashboard = () => {
    const MAX_TASKS = 3;
    
    const [tasks, setTasks] = React.useState([
        { id: 1, title: 'Example Task', status: 'Not Started', dueDate: '2024-10-01' },
        { id: 2, title: 'Review Documentation', status: 'In Progress', dueDate: '2024-11-15' },
    ]);
    
    const [newTask, setNewTask] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [showLimitAlert, setShowLimitAlert] = React.useState(false);
    
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        
        if (tasks.length >= MAX_TASKS) {
            setShowLimitAlert(true);
            setTimeout(() => setShowLimitAlert(false), 3000);
            setNewTask('');
            return;
        }
        
        const newTaskItem = {
            id: Date.now(),
            title: newTask.trim(),
            status: 'Not Started',
            dueDate: new Date().toISOString().split('T')[0]
        };
        
        setTasks(prevTasks => [...prevTasks, newTaskItem]);
        setNewTask('');
    };

    const handleEmailClick = (task) => {
        setSelectedTask(task);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const removeTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };
    
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <form onSubmit={addTask} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add new task..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                    type="submit"
                    className={`p-2 rounded-md transition-colors duration-200 ${
                        tasks.length >= MAX_TASKS 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                    disabled={tasks.length >= MAX_TASKS}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                    </svg>
                </button>
            </form>
            
            <div className="space-y-3">
                {tasks.map(task => (
                    <div 
                        key={task.id}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200 flex justify-between items-center bg-gray-50"
                    >
                        <div>
                            <h3 className="font-medium text-gray-800">{task.title}</h3>
                            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                                onClick={() => handleEmailClick(task)}
                                title="Generate email"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                </svg>
                            </button>
                            <button 
                                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                                onClick={() => removeTask(task.id)}
                                title="Remove task"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 6h18"/>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Task count indicator */}
            <div className="mt-4 text-sm text-gray-500 text-center">
                Tasks: {tasks.length}/{MAX_TASKS}
            </div>

            {showAlert && selectedTask && (
                <div 
                    className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in"
                    style={{
                        animation: 'fadeInOut 3s ease-in-out'
                    }}
                >
                    <style>
                        {`
                            @keyframes fadeInOut {
                                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                                15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                                85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                            }
                        `}
                    </style>
                    Your Ollama model will generate a custom email for task: {selectedTask.title}
                </div>
            )}

            {showLimitAlert && (
                <div 
                    className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50"
                    style={{
                        animation: 'fadeInOut 3s ease-in-out'
                    }}
                >
                    Maximum limit of {MAX_TASKS} tasks reached. Please remove a task first.
                </div>
            )}
        </div>
    );
};

const rootElement = document.getElementById('task-dashboard-root');
if (rootElement) {
    ReactDOM.render(<SimplifiedTaskDashboard />, rootElement);
}