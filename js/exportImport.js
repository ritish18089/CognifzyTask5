import { notifications } from './notifications.js';

/**
 * Handle Exporting tasks to JSON
 * @param {Array} tasks 
 */
export const exportTasks = (tasks) => {
    if (!tasks || tasks.length === 0) {
        notifications.error('No tasks to export.');
        return;
    }

    try {
        const dataStr = JSON.stringify(tasks, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `tasks_export_${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        notifications.success('Tasks exported successfully!');
    } catch (error) {
        console.error('Export error:', error);
        notifications.error('Failed to export tasks.');
    }
};

/**
 * Handle Importing tasks from JSON
 * @param {Event} event 
 * @param {Function} onSuccessCallback 
 */
export const importTasks = (event, onSuccessCallback) => {
    const file = event.target.files[0];
    
    if (!file) return;

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        notifications.error('Please select a valid JSON file.');
        event.target.value = ''; // Reset input
        return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const importedTasks = JSON.parse(e.target.result);
            
            // Basic validation of imported structure
            if (!Array.isArray(importedTasks)) {
                throw new Error('Invalid format. Expected an array of tasks.');
            }
            
            // Call success callback with new data
            onSuccessCallback(importedTasks);
            notifications.success(`Successfully imported ${importedTasks.length} tasks!`);
            
        } catch (error) {
            console.error('Import error:', error);
            notifications.error('Failed to parse the imported file.');
        } finally {
            event.target.value = ''; // Reset input
        }
    };
    
    reader.readAsText(file);
};
