function increaseProgress(progressId) {
    const progressElement = document.getElementById(progressId);
    const oldValue = progressElement.value 
    progressElement.value = Math.min( oldValue + 10, 100) 
    if (progressElement.value == 100){
      progressElement.parentElement.classList.add("green")
    }
}

