/**
 * Validation utility for task inputs
 */
export const validateTask = (title, dueDate, existingTasks, currentTaskId = null) => {
    const errors = {
        isValid: true,
        title: '',
        date: ''
    };

    // Title validation
    if (!title || title.trim().length < 3) {
        errors.title = 'Title must be at least 3 characters long.';
        errors.isValid = false;
    } else if (title.trim().length > 100) {
        errors.title = 'Title cannot exceed 100 characters.';
        errors.isValid = false;
    } else {
        // Check for duplicate title
        const isDuplicate = existingTasks.some(task => 
            task.title.toLowerCase() === title.trim().toLowerCase() && 
            task.id !== Number(currentTaskId)
        );
        
        if (isDuplicate) {
            errors.title = 'A task with this title already exists.';
            errors.isValid = false;
        }
    }

    // Date validation
    if (!dueDate) {
        errors.date = 'Due date is required.';
        errors.isValid = false;
    } else {
        // Check if date is not entirely in the past (allow today)
        const selectedDate = new Date(dueDate);
        selectedDate.setHours(0, 0, 0, 0);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            errors.date = 'Due date cannot be in the past.';
            errors.isValid = false;
        }
    }

    return errors;
};
