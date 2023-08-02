// Login Dialog
document
  .querySelectorAll('#loginDialog button')
  .forEach(
    (e) =>
      (e.onclick = () =>
        document.getElementById('loginDialog').classList.remove('active'))
  )
