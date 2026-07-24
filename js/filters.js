/**
 * Filter and Sort utilities
 */

/**
 * Filter tasks based on search term and filter criteria
 * @param {Array} tasks - All tasks
 * @param {string} searchTerm - Text to search in title/description
 * @param {string} filterValue - filter criteria (all, pending, completed, high, medium, low)
 * @returns {Array} Filtered tasks
 */
export const filterTasks = (tasks, searchTerm = '', filterValue = 'all') => {
    return tasks.filter(task => {
        // Search filter
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              task.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Category filter
        let matchesFilter = true;
        
        switch(filterValue) {
            case 'pending':
                matchesFilter = task.status === 'Pending';
                break;
            case 'completed':
                matchesFilter = task.status === 'Completed';
                break;
            case 'high':
                matchesFilter = task.priority === 'High';
                break;
            case 'medium':
                matchesFilter = task.priority === 'Medium';
                break;
            case 'low':
                matchesFilter = task.priority === 'Low';
                break;
            case 'all':
            default:
                matchesFilter = true;
                break;
        }
        
        return matchesSearch && matchesFilter;
    });
};

/**
 * Sort tasks based on criteria
 * @param {Array} tasks - Filtered tasks to sort
 * @param {string} sortValue - Sort criteria
 * @returns {Array} Sorted tasks
 */
export const sortTasks = (tasks, sortValue = 'recent') => {
    const sortedTasks = [...tasks];
    
    switch(sortValue) {
        case 'dueDate':
            sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            break;
        case 'priority':
            const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
            sortedTasks.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
            break;
        case 'alphabetical':
            sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'recent':
        default:
            // Sort by createdAt descending
            sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
    }
    
    return sortedTasks;
};
