function increaseProgress(progressId) {
  const progressElement = document.getElementById(progressId);
  if (progressElement.value == 100)
    return
  const oldValue = progressElement.value;
  const step = parseInt(progressElement.getAttribute("step")) || 10;
  progressElement.value = Math.min(oldValue + step, 100);
  if (progressElement.value == 100) {
    progressElement.parentElement.classList.add("green");
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
}
