const updateContainer = (name, data) => {

  const containerName = `.${name}-container ul.list-group`;
  const containerTag = document.querySelector(containerName);
  console.log(containerTag)
  let newTab = '';

  // clean container
  containerTag.innerHTML = '';

  if(name === 'project') {
    data.forEach((project) => {
      newTab = addProjectTab(project);
      containerTag.appendChild(newTab);
    })
  }
  else if(name === 'note') {
    newTab = addNoteTab(data);
    containerTag.appendChild(newTab);
  }
  else if (name === 'note-untracked') {
    newTab = addUntrackedNoteTab(data);
    containerTag.appendChild(newTab);
  }
  else {
    throw 'Container name is not valid.';
  }
}

// NEEDS COMPLETION
const addProjectTab = (project) => {
  // <li class="list-group-item d-flex justify-content-between align-items-center">
  //   Cras justo odio
  //   <span class="badge badge-primary badge-pill">14</span>
  // </li>
  const li = document.createElement('li');

  li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
  li.innerHTML = (project.name).concat(`<span class="badge badge-primary badge-pill">${project.notes.length}</span>`);

  return li;
}

const addNoteTab = (note) => {}

const addUntrackedNoteTab = (untrackedNote) => {}
////////////////////

const setMultipleAttributes = (elem, attrs) => {
  for(let key in attrs) {
    elem.setAttribute(key, attrs[key])
  }
}

const isElementDefined = (elem) => {
  if(elem === undefined) {
    return false;
  }
  return true;
}

const isWindowSelected = (tab) => {
  if (tab.selected === true ) {
    return true;
  }

  return false;
}

const addProject = (newProjectName, projectsStored) => {

  const { id, name } = projectsStored[projectsStored.length - 1];
  let newId;

  if(projectsStored.length === 0) {
    newId = 0;
  }
  newId = id + 1;

  const newProject = {
    id: newId,
    name: newProjectName,
    notes: []
  }

  projectsStored.push(newProject);

  updateContainer('project', projectsStored);
  return projectsStored;
}

export {
  updateContainer,
  setMultipleAttributes,
  isElementDefined,
  isWindowSelected,
  addProject,
}
