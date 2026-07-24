/**
 * Toast notification system
 */
class Notifications {
    constructor() {
        this.container = document.getElementById('toastContainer');
    }

    /**
     * Show a toast notification
     * @param {string} message - Notification text
     * @param {string} type - 'success', 'error', or 'info'
     */
    show(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type} toast-enter`;
        
        // Icon based on type
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('toast-enter');
            toast.classList.add('toast-exit');
            
            // Wait for animation to finish before removing from DOM
            setTimeout(() => {
                if (this.container.contains(toast)) {
                    this.container.removeChild(toast);
                }
            }, 300); // Matches animation duration
        }, 3000);
    }

    success(message) {
        this.show(message, 'success');
    }

    error(message) {
        this.show(message, 'error');
    }

    info(message) {
        this.show(message, 'info');
    }
}

export const notifications = new Notifications();
