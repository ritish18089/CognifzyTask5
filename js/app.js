import { TaskManager } from './taskManager.js';
import { UI } from './ui.js';
import { storage } from './storage.js';
import { validateTask } from './validation.js';
import { filterTasks, sortTasks } from './filters.js';
import { updateStatistics } from './statistics.js';
import { exportTasks, importTasks } from './exportImport.js';

// Application State and Instances
const taskManager = new TaskManager();
const ui = new UI(taskManager);

// Current View State
let currentSearch = '';
let currentFilter = 'all';
let currentSort = 'recent';

/**
 * Initialize the application
 */
const initApp = () => {
    // Apply theme
    applyTheme(storage.getTheme());
    
    // Bind Event Listeners
    bindEvents();
    
    // Initial Render
    refreshUI();
};

/**
 * Core refresh function to update DOM and Stats based on state
 */
const refreshUI = () => {
    const allTasks = taskManager.getAllTasks();
    const filteredTasks = filterTasks(allTasks, currentSearch, currentFilter);
    const sortedTasks = sortTasks(filteredTasks, currentSort);
    
    ui.renderTasks(sortedTasks);
    updateStatistics(allTasks);
};

/**
 * Apply theme to document
 * @param {string} theme 
 */
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
};

/**
 * Bind all DOM events
 */
const bindEvents = () => {
    // Theme Toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        const currentTheme = storage.getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        storage.saveTheme(newTheme);
        applyTheme(newTheme);
    });

    // Toolbar Actions
    document.getElementById('searchInput').addEventListener('input', (e) => {
        currentSearch = e.target.value;
        refreshUI();
    });

    document.getElementById('filterSelect').addEventListener('change', (e) => {
        currentFilter = e.target.value;
        refreshUI();
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        refreshUI();
    });

    // Add Task Button
    document.getElementById('addTaskBtn').addEventListener('click', () => {
        ui.openModal();
    });

    // Modal Actions
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        ui.closeModal();
    });

    document.getElementById('cancelTaskBtn').addEventListener('click', () => {
        ui.closeModal();
    });

    // Close modal on outside click
    document.getElementById('taskModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('taskModal')) {
            ui.closeModal();
        }
    });

    // Close confirm modal on cancel
    document.getElementById('cancelConfirmBtn').addEventListener('click', () => {
        ui.closeConfirmModal();
    });

    // Form Submission (Add/Edit)
    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskId = ui.taskIdInput.value;
        const taskData = {
            title: ui.taskTitleInput.value,
            description: ui.taskDescriptionInput.value,
            priority: ui.taskPriorityInput.value,
            dueDate: ui.taskDueDateInput.value,
            status: taskId ? ui.taskStatusInput.value : 'Pending'
        };

        const validationErrors = validateTask(taskData.title, taskData.dueDate, taskManager.getAllTasks(), taskId);

        if (!validationErrors.isValid) {
            ui.showErrors(validationErrors);
            return;
        }

        if (taskId) {
            // Edit existing
            taskManager.updateTask(taskId, taskData);
        } else {
            // Add new
            taskManager.addTask(taskData);
        }

        ui.closeModal();
        refreshUI();
    });

    // Custom Events triggered from Task Cards (Delegation alternative)
    document.addEventListener('task:toggle', (e) => {
        taskManager.toggleTaskStatus(e.detail.id);
        refreshUI();
    });

    document.addEventListener('task:edit', (e) => {
        const task = taskManager.getTaskById(e.detail.id);
        if (task) {
            ui.openModal(task);
        }
    });

    document.addEventListener('task:delete', (e) => {
        ui.openConfirmModal(
            'Delete Task',
            'Are you sure you want to delete this task? This cannot be undone.',
            () => {
                taskManager.deleteTask(e.detail.id);
                refreshUI();
            }
        );
    });

    // Clear All Tasks
    document.getElementById('clearAllBtn').addEventListener('click', () => {
        if (taskManager.getAllTasks().length === 0) return;
        
        ui.openConfirmModal(
            'Clear All Tasks',
            'Are you sure you want to delete all tasks? This will wipe your data permanently.',
            () => {
                taskManager.clearAllTasks();
                refreshUI();
            }
        );
    });

    // Export Tasks
    document.getElementById('exportBtn').addEventListener('click', () => {
        exportTasks(taskManager.getAllTasks());
    });

    // Import Tasks
    const fileImport = document.getElementById('fileImport');
    document.getElementById('importBtn').addEventListener('click', () => {
        fileImport.click();
    });

    fileImport.addEventListener('change', (e) => {
        importTasks(e, (newTasks) => {
            taskManager.setTasks(newTasks);
            refreshUI();
        });
    });
};

// Start application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
