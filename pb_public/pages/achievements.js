function increaseProgress(progressId) {
    const progressElement = document.getElementById(progressId);
    if (progressElement) {
      const currentValue = progressElement.value || 0;
      const maxValue = progressElement.max || 100;
      const newValue = Math.min(currentValue + 10, maxValue); // Erhöhe um 10 oder ändere diesen Wert
      progressElement.value = newValue;
    }
  }
