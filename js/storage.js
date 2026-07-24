/**
 * Storage utility for handling LocalStorage operations
 */
class Storage {
    constructor() {
        this.STORAGE_KEY = 'taskmaster_data';
        this.THEME_KEY = 'taskmaster_theme';
    }

    /**
     * Get all tasks from local storage
     * @returns {Array} Array of task objects
     */
    getTasks() {
        try {
            const tasks = localStorage.getItem(this.STORAGE_KEY);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.error('Error reading from local storage', error);
            return [];
        }
    }

    /**
     * Save tasks to local storage
     * @param {Array} tasks - Array of task objects to save
     */
    saveTasks(tasks) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving to local storage', error);
            throw new Error('Could not save data. Local storage might be full.');
        }
    }

    /**
     * Clear all tasks from local storage
     */
    clearTasks() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
    
    /**
     * Save theme preference
     * @param {string} theme 'light' or 'dark'
     */
    saveTheme(theme) {
        localStorage.setItem(this.THEME_KEY, theme);
    }
    
    /**
     * Get theme preference
     * @returns {string} 'light' or 'dark'
     */
    getTheme() {
        return localStorage.getItem(this.THEME_KEY) || 'light';
    }
}

export const storage = new Storage();
