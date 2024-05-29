// 샘플 데이터 (예시). 실제 프로젝트 데이터는 백엔드에서 가져옵니다.
const sampleProjects = [
    /*
    { name: 'Project 1', description: 'Description for Project 1', createdDate: '2024-01-01', createdBy: 'Admin 1' },
    { name: 'Project 2', description: 'Description for Project 2', createdDate: '2024-02-01', createdBy: 'Admin 2' },
    { name: 'Project 3', description: 'Description for Project 3', createdDate: '2024-03-01', createdBy: 'Admin 3' },
    { name: 'Project 4', description: 'Description for Project 4', createdDate: '2024-04-01', createdBy: 'Admin 4' },
    { name: 'Project 5', description: 'Description for Project 5', createdDate: '2024-05-01', createdBy: 'Admin 5' },
    { name: 'Project 6', description: 'Description for Project 6', createdDate: '2024-06-01', createdBy: 'Admin 6' },
    { name: 'Project 7', description: 'Description for Project 7', createdDate: '2024-07-01', createdBy: 'Admin 7' },
    { name: 'Project 8', description: 'Description for Project 8', createdDate: '2024-08-01', createdBy: 'Admin 8' },
    { name: 'Project 9', description: 'Description for Project 9', createdDate: '2024-09-01', createdBy: 'Admin 9' },
    { name: 'Project 10', description: 'Description for Project 10', createdDate: '2024-10-01', createdBy: 'Admin 10' },
    { name: 'Project 11', description: 'Description for Project 11', createdDate: '2024-11-01', createdBy: 'Admin 11' },
    { name: 'Project 12', description: 'Description for Project 12', createdDate: '2024-12-01', createdBy: 'Admin 12' },
    { name: 'Project 13', description: 'Description for Project 13', createdDate: '2025-01-01', createdBy: 'Admin 13' },
    { name: 'Project 14', description: 'Description for Project 14', createdDate: '2025-02-01', createdBy: 'Admin 14' },
    { name: 'Project 15', description: 'Description for Project 15', createdDate: '2025-03-01', createdBy: 'Admin 15' },
    { name: 'Project 16', description: 'Description for Project 16', createdDate: '2025-04-01', createdBy: 'Admin 16' },
    { name: 'Project 17', description: 'Description for Project 17', createdDate: '2025-05-01', createdBy: 'Admin 17' },
    { name: 'Project 18', description: 'Description for Project 18', createdDate: '2025-06-01', createdBy: 'Admin 18' },
    { name: 'Project 19', description: 'Description for Project 19', createdDate: '2025-07-01', createdBy: 'Admin 19' },
    { name: 'Project 20', description: 'Description for Project 20', createdDate: '2025-08-01', createdBy: 'Admin 20' },
    { name: 'Project 21', description: 'Description for Project 21', createdDate: '2025-09-01', createdBy: 'Admin 21' },
    { name: 'Project 22', description: 'Description for Project 22', createdDate: '2025-10-01', createdBy: 'Admin 22' },
    { name: 'Project 23', description: 'Description for Project 23', createdDate: '2025-11-01', createdBy: 'Admin 23' },
    { name: 'Project 24', description: 'Description for Project 24', createdDate: '2025-12-01', createdBy: 'Admin 24' },
    { name: 'Project 25', description: 'Description for Project 25', createdDate: '2026-01-01', createdBy: 'Admin 25' }
*/
];

let currentEditProjectIndex = null;
const loggedInUser = 'currentUser'; // 현재 로그인한 사용자의 닉네임을 나타내는 변수

const projectsPerPage = 20;
let currentPage = 1;
let totalPages = Math.ceil(sampleProjects.length / projectsPerPage);

// 프로젝트 리스트를 화면에 표시하는 함수
function displayProjects(projects, page) {
    const projectTableBody = document.getElementById('project-table-body');
    projectTableBody.innerHTML = '';

    const start = (page - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    const paginatedProjects = projects.slice(start, end);

    paginatedProjects.forEach((project, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${project.id}</td>
            <td>${project.name}</td>
            <td>
                <button class="btn" onclick="viewProject(${start + index})">View</button>
                <button class="btn" onclick="editProject(${start + index})">Edit</button>
                <button class="btn" onclick="deleteProject(${start + index})">Del</button>
                <span class="divider"></span>
                <button class="btn" onclick="viewUserList(${start + index})">UserList</button>
            </td>
        `;
        projectTableBody.appendChild(row);
    });

    updatePagination();
}

// 페이지네이션 업데이트 함수
function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add('disabled');
            button.disabled = true;
        } else {
            button.onclick = () => changePage(i);
        }
        pagination.appendChild(button);
    }
}

// 페이지 변경 함수
function changePage(page) {
    currentPage = page;
    displayProjects(sampleProjects, currentPage);
}

// 프로젝트를 조회하는 함수 (mainPage.html로 연결)
function viewProject(index) {
    const project = sampleProjects[index];
    // 선택한 프로젝트의 이름을 URL 파라미터로 전달합니다.
    window.location.href = `mainPage.html?projectId=${project.id}`;
}

// 프로젝트의 사용자 목록을 보는 함수 (userListPage.html로 연결)
function viewUserList(index) {
    const project = sampleProjects[index];
    // 선택한 프로젝트의 이름을 URL 파라미터로 전달합니다.
    window.location.href = `userListPage.html?projectId=${project.id}`;
} //projectId는 우선 조회한 index를 넘겨주는 것으로 설정했음.

// 프로젝트를 편집하는 함수 (모달 열기)
function editProject(index) {
    currentEditProjectIndex = index;
    const project = sampleProjects[index];
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editProjectModal').style.display = 'block';
}

// 프로젝트 편집 모달을 닫는 함수
function closeEditProjectModal() {
    document.getElementById('editProjectModal').style.display = 'none';
}

// 프로젝트 편집 내용을 저장하는 함수
function saveEditProject() {
    const newName = document.getElementById('editProjectName').value;
    if (currentEditProjectIndex !== null && newName && newDescription) {
        sampleProjects[currentEditProjectIndex].name = newName;
        // 수정된 프로젝트 이름과 설명을 백엔드에 저장하는 로직이 추가되어야 합니다.
        displayProjects(sampleProjects, currentPage);
        closeEditProjectModal();
    }
}

// 프로젝트를 삭제하는 함수
function deleteProject(index) {
    sampleProjects.splice(index, 1);
    // 삭제된 프로젝트를 백엔드에 반영하는 로직이 추가되어야 합니다.
    totalPages = Math.ceil(sampleProjects.length / projectsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    displayProjects(sampleProjects, currentPage);
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
function saveCreateProject() {
    const name = document.getElementById('createProjectName').value;
    const createdDate = new Date().toISOString().split('T')[0];
    const createdBy = loggedInUser;
    if (name) {
        // 새로운 프로젝트를 백엔드에 저장하는 로직 (fetch API 사용)
        fetch('/api/project', {
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
            if (response.status == 201) {
                return response.json(); 
            } else if (response.status === 409) {
                throw new Error('Project creation failed: The project name already exists.');
            } else {
                throw new Error('An error occurred during project creation.');
            }
        })
        .then(data => {
            console.log('Project creation successful', data, data.projcet_id);
            sampleProjects.push({ id : data.project_id, name : name, description: null, createdDate: createdDate, createdBy: createdBy })
            displayProjects(sampleProjects, currentPage);
            closeCreateProjectModal();
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        });
    }
}

//서버로부터 프로젝트 가져오는 함수
function fetchProject(){
    fetch('api/project',{
        method: 'GET'
    })
    .then(response => {
        if (response.status == 200){
            return response.json();
        } else{
            throw new Error('get project has error');
        }
    })
    .then(data => {
        console.log('get project', data);
        data.forEach(project=>{
            console.log('push 이전', project);
            sampleProjects.push({id : project.id, name : project.project_name});
            console.log('push 이후',sampleProjects);
            displayProjects(sampleProjects, currentPage);
        });
    })
    .catch(error =>{
        console.log(error);
    });
}

//초기 프로젝트 서버로부터 가져오고 표시하기
fetchProject();

