import { getIdNumber, removeProject } from './helpers.js';

const setDeleteProjectHandler = () => {
  const deleteContainers = document.getElementsByClassName('delete-container');

  for(let i=0; i < deleteContainers.length; i++) {
    deleteContainers[i].addEventListener('click', (event) => {
      event.preventDefault();
      let projectId = getIdNumber(deleteContainers[i].parentNode.id);
      chrome.storage.sync.get('projects', (data) => {
        let newProjectList = removeProject(projectId, data.projects);

        chrome.storage.sync.set({'projects': newProjectList});
      })
    })
  }
}

export {
  setDeleteProjectHandler
}
