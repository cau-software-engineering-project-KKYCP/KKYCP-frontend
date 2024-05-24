// 샘플 데이터 (예시). 실제 프로젝트 데이터는 백엔드에서 가져옵니다.
const sampleProjects = [
    { name: 'Project 1', description: 'Description for Project 1', createdDate: '2024-01-01', createdBy: 'Admin 1' },
    { name: 'Project 2', description: 'Description for Project 2', createdDate: '2024-02-01', createdBy: 'Admin 2' },
    { name: 'Project 3', description: 'Description for Project 3', createdDate: '2024-03-01', createdBy: 'Admin 3' }
];

let currentEditProjectIndex = null;
const loggedInUser = 'currentUser'; // 현재 로그인한 사용자의 닉네임을 나타내는 변수

// 프로젝트 리스트를 화면에 표시하는 함수
function displayProjects(projects) {
    const projectTableBody = document.getElementById('project-table-body');
    projectTableBody.innerHTML = '';

    projects.forEach((project, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.name}</td>
            <td>${project.description}</td>
            <td>${project.createdDate}</td>
            <td>${project.createdBy}</td>
            <td>
                <button class="btn" onclick="viewProject(${index})">View</button>
                <button class="btn" onclick="editProject(${index})">Edit</button>
                <button class="btn" onclick="deleteProject(${index})">Del</button>
            </td>
        `;
        projectTableBody.appendChild(row);
    });
}

// 프로젝트를 조회하는 함수 (mainPage.html로 연결)
function viewProject(index) {
    const project = sampleProjects[index];
    // 선택한 프로젝트의 이름을 URL 파라미터로 전달합니다.
    window.location.href = `mainPage.html?project=${project.name}`;
}

// 프로젝트를 편집하는 함수 (모달 열기)
function editProject(index) {
    currentEditProjectIndex = index;
    const project = sampleProjects[index];
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editProjectDescription').value = project.description;
    document.getElementById('editProjectModal').style.display = 'block';
}

// 프로젝트 편집 모달을 닫는 함수
function closeEditProjectModal() {
    document.getElementById('editProjectModal').style.display = 'none';
}

// 프로젝트 편집 내용을 저장하는 함수
function saveEditProject() {
    const newName = document.getElementById('editProjectName').value;
    const newDescription = document.getElementById('editProjectDescription').value;
    if (currentEditProjectIndex !== null && newName && newDescription) {
        sampleProjects[currentEditProjectIndex].name = newName;
        sampleProjects[currentEditProjectIndex].description = newDescription;
        // 수정된 프로젝트 이름과 설명을 백엔드에 저장하는 로직이 추가되어야 합니다.
        displayProjects(sampleProjects);
        closeEditProjectModal();
    }
}

// 프로젝트를 삭제하는 함수
function deleteProject(index) {
    sampleProjects.splice(index, 1);
    // 삭제된 프로젝트를 백엔드에 반영하는 로직이 추가되어야 합니다.
    displayProjects(sampleProjects);
}

// 새로운 프로젝트 모달을 여는 함수
function openCreateProjectModal() {
    document.getElementById('createProjectModal').style.display = 'block';
}

// 새로운 프로젝트 모달을 닫는 함수
function closeCreateProjectModal() {
    document.getElementById('createProjectModal').style.display = 'none';
}

// 새로운 프로젝트를 저장하는 함수
async function saveCreateProject() {
    const name = document.getElementById('createProjectName').value;
    const createdDate = new Date().toISOString().split('T')[0];
    const createdBy = loggedInUser;
    if (name) {

        // 새로운 프로젝트를 백엔드에 저장하는 로직 (fetch API 사용)
        await fetch('/api/project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                project_name: name
            })
        })
        .then(response => {
            // 프로젝트 생성 성공
            if (response.status === 201) {
                sampleProjects.push({name, description:null ,createdDate, createdBy})
            } else if (response.status === 409) {
                throw new Error('Project creation failed: The project name already exists.');
            } else {
                throw new Error('An error occurred during project creation.');
            }
        })
        .then(data => {
            console.log('Project creation successful', data);
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
        // 백엔드 로직
        displayProjects(sampleProjects);
        closeCreateProjectModal();
    }
}

// 초기 프로젝트 리스트 표시
displayProjects(sampleProjects);