import { storage } from './storage.js';
import { notifications } from './notifications.js';

/**
 * Task Manager class to handle business logic and state
 */
export class TaskManager {
    constructor() {
        this.tasks = storage.getTasks();
    }

    /**
     * Get all tasks
     * @returns {Array} Array of tasks
     */
    getAllTasks() {
        return this.tasks;
    }

    /**
     * Get a specific task by ID
     * @param {number} id 
     * @returns {Object|undefined}
     */
    getTaskById(id) {
        return this.tasks.find(task => task.id === Number(id));
    }

    /**
     * Add a new task
     * @param {Object} taskData 
     * @returns {Object} the created task
     */
    addTask(taskData) {
        const newTask = {
            id: Date.now(),
            title: taskData.title.trim(),
            description: taskData.description.trim(),
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            status: taskData.status || 'Pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.save();
        notifications.success('Task created successfully!');
        return newTask;
    }

    /**
     * Update an existing task
     * @param {number} id 
     * @param {Object} updateData 
     * @returns {Object|null} the updated task
     */
    updateTask(id, updateData) {
        const index = this.tasks.findIndex(task => task.id === Number(id));
        
        if (index === -1) {
            notifications.error('Task not found.');
            return null;
        }

        this.tasks[index] = {
            ...this.tasks[index],
            title: updateData.title.trim(),
            description: updateData.description.trim(),
            priority: updateData.priority,
            dueDate: updateData.dueDate,
            status: updateData.status,
            updatedAt: new Date().toISOString()
        };

        this.save();
        notifications.success('Task updated successfully!');
        return this.tasks[index];
    }

    /**
     * Toggle task status (Pending <-> Completed)
     * @param {number} id 
     */
    toggleTaskStatus(id) {
        const task = this.getTaskById(id);
        if (task) {
            task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
            task.updatedAt = new Date().toISOString();
            this.save();
            const statusMsg = task.status === 'Completed' ? 'completed' : 'marked as pending';
            notifications.success(`Task ${statusMsg}.`);
            return task;
        }
        return null;
    }

    /**
     * Delete a task
     * @param {number} id 
     */
    deleteTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== Number(id));
        
        if (this.tasks.length < initialLength) {
            this.save();
            notifications.success('Task deleted.');
            return true;
        }
        return false;
    }

    /**
     * Clear all tasks
     */
    clearAllTasks() {
        this.tasks = [];
        this.save();
        notifications.success('All tasks cleared.');
    }

    /**
     * Save current state to storage
     */
    save() {
        storage.saveTasks(this.tasks);
    }
    
    /**
     * Replace all tasks (used for import)
     * @param {Array} newTasks 
     */
    setTasks(newTasks) {
        this.tasks = newTasks;
        this.save();
    }
}
