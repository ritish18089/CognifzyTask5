/**
 * UI Manipulation class
 */
export class UI {
    constructor(taskManager) {
        this.taskManager = taskManager;
        
        // DOM Elements
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.taskModal = document.getElementById('taskModal');
        this.confirmModal = document.getElementById('confirmModal');
        this.taskForm = document.getElementById('taskForm');
        this.modalTitle = document.getElementById('modalTitle');
        this.statusGroup = document.getElementById('statusGroup');
        
        // Form Inputs
        this.taskIdInput = document.getElementById('taskId');
        this.taskTitleInput = document.getElementById('taskTitle');
        this.taskDescriptionInput = document.getElementById('taskDescription');
        this.taskPriorityInput = document.getElementById('taskPriority');
        this.taskDueDateInput = document.getElementById('taskDueDate');
        this.taskStatusInput = document.getElementById('taskStatus');
        
        // Error spans
        this.titleError = document.getElementById('titleError');
        this.dateError = document.getElementById('dateError');
    }

    /**
     * Render tasks to the DOM
     * @param {Array} tasks - Array of tasks to render
     */
    renderTasks(tasks) {
        this.taskList.innerHTML = '';

        if (tasks.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            
            tasks.forEach((task, index) => {
                const delay = (index % 10) * 0.1; // Staggered animation
                const taskCard = this.createTaskCard(task, delay);
                this.taskList.appendChild(taskCard);
            });
        }
    }

    /**
     * Create a single task card DOM element
     * @param {Object} task 
     * @param {number} delay - Animation delay
     * @returns {HTMLElement}
     */
    createTaskCard(task, delay) {
        const card = document.createElement('div');
        card.className = `task-card glass ${task.status === 'Completed' ? 'completed' : ''}`;
        card.dataset.id = task.id;

        // Format date
        const dateOpts = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = new Date(task.dueDate).toLocaleDateString(undefined, dateOpts);

        card.innerHTML = `
            <div class="task-header">
                <h3 class="task-title" title="${task.title}">${task.title}</h3>
                <span class="badge badge-priority-${task.priority}">${task.priority}</span>
            </div>
            <p class="task-desc">${task.description || '<i>No description provided</i>'}</p>
            
            <div class="task-meta">
                <span class="badge badge-status-${task.status}">
                    <i class="fas ${task.status === 'Completed' ? 'fa-check' : 'fa-clock'}"></i> 
                    ${task.status}
                </span>
                <span class="badge"><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
            </div>
            
            <div class="task-actions">
                <button class="btn btn-outline toggle-status-btn" title="Mark as ${task.status === 'Completed' ? 'Pending' : 'Completed'}">
                    <i class="fas ${task.status === 'Completed' ? 'fa-undo' : 'fa-check'}"></i>
                </button>
                <button class="btn btn-outline edit-btn" title="Edit Task">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline btn-danger delete-btn" title="Delete Task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Event listeners for card buttons
        card.querySelector('.toggle-status-btn').addEventListener('click', () => {
            // This event will be caught by delegation in app.js or handled directly here
            document.dispatchEvent(new CustomEvent('task:toggle', { detail: { id: task.id } }));
        });

        card.querySelector('.edit-btn').addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('task:edit', { detail: { id: task.id } }));
        });

        card.querySelector('.delete-btn').addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('task:delete', { detail: { id: task.id } }));
        });

        return card;
    }

    /**
     * Open the Add/Edit Task Modal
     * @param {Object|null} task - Task object if editing, null if adding
     */
    openModal(task = null) {
        this.clearErrors();
        
        if (task) {
            this.modalTitle.textContent = 'Edit Task';
            this.taskIdInput.value = task.id;
            this.taskTitleInput.value = task.title;
            this.taskDescriptionInput.value = task.description;
            this.taskPriorityInput.value = task.priority;
            this.taskDueDateInput.value = task.dueDate;
            
            this.statusGroup.classList.remove('hidden');
            this.taskStatusInput.value = task.status;
        } else {
            this.modalTitle.textContent = 'Add New Task';
            this.taskForm.reset();
            this.taskIdInput.value = '';
            
            // Set default date to today
            const today = new Date().toISOString().split('T')[0];
            this.taskDueDateInput.value = today;
            
            this.statusGroup.classList.add('hidden');
        }

        this.taskModal.classList.remove('hidden');
        this.taskModal.querySelector('.modal').classList.add('modal-pop');
        this.taskTitleInput.focus();
    }

    /**
     * Close the Add/Edit Task Modal
     */
    closeModal() {
        this.taskModal.classList.add('hidden');
        this.taskForm.reset();
        this.clearErrors();
    }

    /**
     * Open Confirmation Modal
     * @param {string} title 
     * @param {string} message 
     * @param {Function} onConfirm 
     */
    openConfirmModal(title, message, onConfirm) {
        document.getElementById('confirmTitle').textContent = title;
        document.getElementById('confirmMessage').textContent = message;
        
        const proceedBtn = document.getElementById('proceedConfirmBtn');
        
        // Remove old listeners to avoid multiple fires
        const newProceedBtn = proceedBtn.cloneNode(true);
        proceedBtn.parentNode.replaceChild(newProceedBtn, proceedBtn);
        
        newProceedBtn.addEventListener('click', () => {
            onConfirm();
            this.closeConfirmModal();
        });

        this.confirmModal.classList.remove('hidden');
        this.confirmModal.querySelector('.modal').classList.add('modal-pop');
    }

    /**
     * Close Confirmation Modal
     */
    closeConfirmModal() {
        this.confirmModal.classList.add('hidden');
    }

    /**
     * Display validation errors in the form
     * @param {Object} errors 
     */
    showErrors(errors) {
        this.clearErrors();
        if (errors.title) {
            this.titleError.textContent = errors.title;
            this.taskTitleInput.style.borderColor = 'var(--danger)';
        }
        if (errors.date) {
            this.dateError.textContent = errors.date;
            this.taskDueDateInput.style.borderColor = 'var(--danger)';
        }
    }

    /**
     * Clear validation errors
     */
    clearErrors() {
        this.titleError.textContent = '';
        this.dateError.textContent = '';
        this.taskTitleInput.style.borderColor = '';
        this.taskDueDateInput.style.borderColor = '';
    }
}
