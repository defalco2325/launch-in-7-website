// Performance utilities to reduce main-thread work

// Dynamically manage will-change property to reduce compositor layers
export const optimizeWillChange = () => {
  const elements = document.querySelectorAll('[style*="will-change"], .animate-fade-in-up');
  
  elements.forEach((el) => {
    const element = el as HTMLElement;
    
    // Remove will-change after animation completes
    element.addEventListener('animationend', () => {
      element.style.willChange = 'auto';
    }, { once: true });
    
    // Remove will-change after transition completes
    element.addEventListener('transitionend', () => {
      element.style.willChange = 'auto';
    }, { once: true });
  });
};

// Yield control to main thread periodically during heavy operations
export const yieldToMain = () => {
  return new Promise(resolve => {
    if (typeof MessageChannel !== 'undefined') {
      const channel = new MessageChannel();
      channel.port1.onmessage = () => resolve(undefined);
      channel.port2.postMessage(null);
    } else {
      setTimeout(resolve, 0);
    }
  });
};

// Batch DOM reads and writes to prevent layout thrashing
export class DOMBatcher {
  private readTasks: Array<() => void> = [];
  private writeTasks: Array<() => void> = [];
  private isScheduled = false;

  read(task: () => void) {
    this.readTasks.push(task);
    this.schedule();
  }

  write(task: () => void) {
    this.writeTasks.push(task);
    this.schedule();
  }

  private schedule() {
    if (this.isScheduled) return;
    this.isScheduled = true;

    requestAnimationFrame(() => {
      // Batch all reads first
      while (this.readTasks.length) {
        const task = this.readTasks.shift();
        task?.();
      }

      // Then batch all writes
      while (this.writeTasks.length) {
        const task = this.writeTasks.shift();
        task?.();
      }

      this.isScheduled = false;
    });
  }
}

export const domBatcher = new DOMBatcher();