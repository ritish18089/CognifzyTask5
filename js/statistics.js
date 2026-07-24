/**
 * Statistics utility
 */

/**
 * Calculate and update dashboard statistics
 * @param {Array} tasks - Array of all tasks
 */
export const updateStatistics = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    const pending = total - completed;
    const highPriority = tasks.filter(task => task.priority === 'High' && task.status !== 'Completed').length;

    // Animate counter update
    animateValue('totalTasks', total);
    animateValue('completedTasks', completed);
    animateValue('pendingTasks', pending);
    animateValue('highPriorityTasks', highPriority);
};

/**
 * Animate number changes
 * @param {string} id - Element ID
 * @param {number} end - Target value
 */
const animateValue = (id, end) => {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    const start = parseInt(obj.textContent) || 0;
    
    if (start === end) {
        obj.textContent = end;
        return;
    }

    let startTimestamp = null;
    const duration = 500; // ms

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function
        const easeOutQuad = progress * (2 - progress);
        
        obj.textContent = Math.floor(easeOutQuad * (end - start) + start);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = end;
        }
    };
    
    window.requestAnimationFrame(step);
};
