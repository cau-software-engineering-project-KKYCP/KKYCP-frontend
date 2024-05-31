// DB에서 불러온 프로젝트 데이터로 초기화할 변수들
let sampleIssues = []; // 각 프로젝트의 이슈 데이터를 저장하는 객체
let projects = []; // 프로젝트 목록
let projectUsers = []; // 프로젝트별 참여 유저 데이터

let currentProject = null; // 현재 선택된 프로젝트
let currentViewIssue = null;
let currentEditIssue = null;
let currentEditCommentIndex = null;
let loggedInUser = 'currentUser';

const issuesPerPage = 20; // 한 페이지에 표시할 이슈 수
let currentPage = 1; // 현재 페이지 번호
let totalPages = 1; // 전체 페이지 수

// 백엔드에서 프로젝트 데이터를 가져와서 초기화하는 함수
async function fetchProjects() {
    // 실제 API 호출 코드로 교체 필요
    // 예시: const response = await fetch('/api/projects');
    // const data = await response.json();
    /*
    const data = [
        { name: 'Project 1', description: 'Description for Project 1', createdDate: '2024-01-01', createdBy: 'Admin 1' },
        { name: 'Project 2', description: 'Description for Project 2', createdDate: '2024-02-01', createdBy: 'Admin 2' },
        { name: 'Project 3', description: 'Description for Project 3', createdDate: '2024-03-01', createdBy: 'Admin 3' },
        { name: 'Project 4', description: 'Description for Project 4', createdDate: '2024-04-01', createdBy: 'Admin 4' },
        { name: 'Project 5', description: 'Description for Project 5', createdDate: '2024-05-01', createdBy: 'Admin 5' },
        { name: 'Project 6', description: 'Description for Project 6', createdDate: '2024-06-01', createdBy: 'Admin 6' }
    ];
    */
    //projects = data;
    //displayProjects();
}

// 프로젝트 목록을 드롭다운에 표시하는 함수
function displayProjects() {
    //const projectSelect = document.getElementById('projectSelect');
    //projectSelect.innerHTML = '';
    /*
    projects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.name;
        option.text = project.name;
        //projectSelect.appendChild(option);
    });
    */
    // URL 파라미터에서 선택된 프로젝트를 가져와 설정
    const urlParams = new URLSearchParams(window.location.search);
    const selectedProjectId = urlParams.get('projectId');
    if (selectedProjectId) {
        currentProject = selectedProjectId;
    } else {
        currentProject = projects.length > 0 ? projects[0].name : null;
    }

    if (currentProject) {
        fetchIssues(currentProject);
        fetchProjectUsers(currentProject);
    }
}

// 선택된 프로젝트의 이슈 데이터를 백엔드에서 불러오는 함수
async function fetchIssues(projectId) {
    // 실제 API 호출 코드로 교체 필요
    // 예시: const response = await fetch(`/api/issues?project=${projectId}`);
    // const data = await response.json();
    if (projectId) {
        fetch(`api/project/${projectId}/issues?offset=${currentPage - 1}&limit=${20}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new Error('There are error browsing issues');
                }
            })
            .then(data => {
                console.log('Issues browsing completed', data)
                sampleIssues = data;
                totalPages = Math.ceil(sampleIssues.length / issuesPerPage);
                console.log('sampleIssues', sampleIssues);
                displayIssues(sampleIssues, currentPage);
            })
    }
    /*
    const data = {
        1: [
            { title: 'Sample Issue 1', description: 'Description for Sample Issue 1', reporter: 'tester1', assignee: 'dev1', priority: 'major', status: 'new', reportedDate: '2024-05-18', type: 'Bug', comments: [] },
            { title: 'Sample Issue 2', description: 'Description for Sample Issue 2', reporter: 'tester2', assignee: 'dev2', priority: 'critical', status: 'assigned', reportedDate: '2024-05-18', type: 'Feature', comments: [] }
        ],
        2: [
            { title: 'Project 2 Issue 1', description: 'Description for Project 2 Issue 1', reporter: 'user1', assignee: 'dev1', priority: 'major', status: 'new', reportedDate: '2024-05-10', type: 'Bug', comments: [] }
        ],
        3: [
            { title: 'Project 3 Issue 1', description: 'Description for Project 3 Issue 1', reporter: 'user3', assignee: 'dev3', priority: 'minor', status: 'resolved', reportedDate: '2024-05-08', type: 'Docs', comments: [] }
        ],
        4: [
            { title: 'Project 4 Issue 1', description: 'Description for Project 4 Issue 1', reporter: 'user4', assignee: 'dev4', priority: 'major', status: 'new', reportedDate: '2024-05-18', type: 'Bug', comments: [] }
        ],
        5: [
            { title: 'Project 5 Issue 1', description: 'Description for Project 5 Issue 1', reporter: 'user5', assignee: 'dev5', priority: 'critical', status: 'assigned', reportedDate: '2024-05-19', type: 'Feature', comments: [] }
        ],
        6: [
            { title: 'Project 6 Issue 1', description: 'Description for Project 6 Issue 1', reporter: 'user6', assignee: 'dev6', priority: 'minor', status: 'resolved', reportedDate: '2024-05-20', type: 'Docs', comments: [] }
        ]
    };
    */
}

// 선택된 프로젝트의 참여 유저 데이터를 백엔드에서 불러오는 함수
async function fetchProjectUsers() {
    // 실제 API 호출 코드로 교체 필요
    // 예시: const response = await fetch(`/api/projects/${projectId}/users`);
    // const data = await response.json();
    fetch(`api/project/${currentProject}/users`, {
        method: 'GET'
    })
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else {
                throw new Error('There are error browsing all users');
            }
        })
        .then(data => {
            console.log('All Users browsing completed', data);
            data.forEach(user => {
                projectUsers.push({ nickname: user.username });
            });
            fetch(`api/project/${currentProject}/privileges`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                }
                else {
                    throw new Error('There are error browsing users privileges');
                }
            })
            .then(privilegesData => {
                console.log('Updated projectUserData with roles', privilegesData);
                privilegesData.forEach(privilegeInfo => {
                    let user = projectUsers.find(u => u.nickname == privilegeInfo.username);
                    if (user) {
                        user.role = privilegeInfo.privileges;
                    }
                });
                console.log('Updated projectUserData with roles', projectUsers);
                filterUsers();
                displayAllUsers(filteredUsers, 1);
            })
            console.log('added completed', projectUsers);
        })
        .catch(error => {
            console.error('Error', error);
        });


    /*
    const data = {
        1: [
            { id: 'user1', nickname: 'User One', role: 'PL' },
            { id: 'user2', nickname: 'User Two', role: 'dev' },
            { id: 'user3', nickname: 'User Three', role: 'tester' }
        ],
        2: [
            { id: 'user4', nickname: 'User Four', role: 'dev' },
            { id: 'user5', nickname: 'User Five', role: 'PL' },
            { id: 'user6', nickname: 'User Six', role: 'tester' }
        ],
        3: [
            { id: 'user7', nickname: 'User Seven', role: 'dev' },
            { id: 'user8', nickname: 'User Eight', role: 'PL' },
            { id: 'user9', nickname: 'User Nine', role: 'tester' }
        ],
        4: [
            { id: 'user10', nickname: 'User Ten', role: 'PL' },
            { id: 'user11', nickname: 'User Eleven', role: 'dev' },
            { id: 'user12', nickname: 'User Twelve', role: 'tester' }
        ],
        5: [
            { id: 'user13', nickname: 'User Thirteen', role: 'PL' },
            { id: 'user14', nickname: 'User Fourteen', role: 'dev' },
            { id: 'user15', nickname: 'User Fifteen', role: 'tester' }
        ],
        6: [
            { id: 'user16', nickname: 'User Sixteen', role: 'PL' },
            { id: 'user17', nickname: 'User Seventeen', role: 'dev' },
            { id: 'user18', nickname: 'User Eighteen', role: 'tester' }
        ]
    };
    */
}

// 프로젝트 변경 시 호출되는 함수
function changeProject() {
    //const projectSelect = document.getElementById('projectSelect');
    //currentProject = projectSelect.value;
    fetchIssues(currentProject);
    fetchProjectUsers();
}

// 이슈 리스트를 화면에 표시하는 함수
function displayIssues(issues, page) {
    const issueTableBody = document.getElementById('issue-table-body');
    const noResults = document.getElementById('no-results');
    issueTableBody.innerHTML = '';
    console.log('displayIssues', issues);

    if (issues.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        const start = (page - 1) * issuesPerPage;
        const end = start + issuesPerPage;
        const paginatedIssues = issues.slice(start, end);

        paginatedIssues.forEach((issue, index) => {
            console.log('issue check',issue);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>${issue.title}</td>
                <td>${issue.reporter}</td>
                <td>${issue.priority}</td>
                <td>${issue.status}</td>
                <td>${issue.type}</td>
                <td>${issue.reported_date}</td>
                <td>
                    <button class="btn" onclick="viewIssue(${issue.id})">View</button>
                    <button class="btn" onclick="editIssue(${issue.id})">Edit</button>
                </td>
            `;
            issueTableBody.appendChild(row);
        });
    }

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
    displayIssues(sampleIssues, page);
}

// 이슈 검색 함수
function searchIssues() {
    const searchQuery = document.getElementById('search').value;
    const searchOption = document.getElementById('searchOption').value;
    const searchTitle = document.getElementById('titleSearch').value;
    console.log('options', searchQuery, searchOption, searchTitle, currentPage);
    fetch(`api/project/${currentProject}/issues?offset=${currentPage-1}&limit=${20}&${searchOption}=${searchQuery}&title=${searchTitle}`,{
        method : 'GET'
    })
    .then(response =>{
        if (response.status == 200) {
            return response.json();
        } else if(response.status === 403){
            throw new Error('해당 프로젝트에서 Issue를 검색할 권한이 없는 계정입니다.');
        }
        else if(response.status == 400){
            console.log('잘못된 형식의 쿼리입력');
            alert('잘못된 형식의 Title이나 조건을 입력하셨습니다.');
        }
        else {
            throw new Error('There are error browsing searching issues');
        }
    })
    .then(data => {
        console.log('searchIssues completed', data);
        sampleIssues = data;
        totalPages = Math.ceil(sampleIssues.length / issuesPerPage);
        console.log('sampleIssues', sampleIssues);
        displayIssues(sampleIssues, currentPage);
        if(sampleIssues.length === 0){
            alert('해당 Issue가 존재하지 않습니다.');
        }
    });
}

// 타이틀로 검색하는 함수 ==> 일단 한 번에 검색하도록 세팅함. 타이틀만으로도 검색 가능 칸 비워두면 됨.
/*
function searchByTitle() {
    
    const filteredIssues = sampleIssues.filter(issue =>
        issue.title.toLowerCase().includes(searchQuery)
    );
    totalPages = Math.ceil(filteredIssues.length / issuesPerPage);
    currentPage = 1;
    displayIssues(filteredIssues, currentPage);
}
*/

// 필터링된 이슈를 화면에 표시하는 함수
function filterIssues() {
    const priorityFilter = document.getElementById('priorityFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;

    let filteredIssues = sampleIssues.filter(issue =>
        (priorityFilter === "" || issue.priority === priorityFilter) &&
        (statusFilter === "" || issue.status === statusFilter)
    );

    if (dateFilter === "asc") {
        filteredIssues.sort((a, b) => new Date(a.reportedDate) - new Date(b.reportedDate));
    } else if (dateFilter === "desc") {
        filteredIssues.sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate));
    }

    totalPages = Math.ceil(filteredIssues.length / issuesPerPage);
    currentPage = 1;
    displayIssues(filteredIssues, currentPage);
}

// 엔터 키 입력 시 검색 함수 호출
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchIssues();
    }
}

// 엔터 키 입력 시 타이틀 검색 함수 호출
function handleTitleKeyPress(event) {
    if (event.key === 'Enter') {
        searchByTitle();
    }
}

// 엔터 키 입력 시 댓글 추가 함수 호출
function handleCommentKeyPress(event) {
    if (event.key === 'Enter') {
        addComment();
    }
}

// 새로운 이슈를 생성하는 모달 열기
function openCreateIssueModal() {
    //loadAssigneeOptions('createAssignee'); // Assignee 목록을 로드
    document.getElementById('createIssueModal').style.display = 'block';
}

// 새로운 이슈 생성 모달 닫기
function closeCreateIssueModal() {
    document.getElementById('createIssueModal').style.display = 'none';
}

// 새로운 이슈를 저장하는 함수
function saveCreateIssue() {
    const id = sampleIssues.length > 0 ? sampleIssues[sampleIssues.length - 1].id + 1 : 1;
    const title = document.getElementById('createTitle').value;
    const description = document.getElementById('createDescription').value;
    const priority = document.getElementById('createPriority').value;
    const status = document.getElementById('createStatus').value;
    const type = document.getElementById('createType').value;
    const reported_date = new Date().toISOString().split('T')[0];
    const reporter = loggedInUser;

    if (title && description) {
        fetch(`api/project/${currentProject}/issues`,{
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : title,
                description : description,
                priority : priority,
                type : type
            })
        })
        .then(response=>{
            if (response.status == 201){
                console.log(response);
                const newIssue = { id, title, description, reporter, priority, status, reported_date, type, comments: [] };
                sampleIssues.push(newIssue);
                // 새로운 이슈를 백엔드에 저장하는 로직이 추가되어야 합니다.
                totalPages = Math.ceil(sampleIssues.length / issuesPerPage);
                displayIssues(sampleIssues, currentPage);
                closeCreateIssueModal();
            } else if(response.status === 403){
                throw new Error('프로젝트에 이슈를 생성할 권한(REPORTER)이 아닌 계정입니다.');
            } else {
                throw new Error('An error occured while saveCreateIssues');
            }
        })
    }
}

// 이슈를 조회하는 함수
function viewIssue(id) {
    console.log('viewIssues id', id);
    fetch(`/api/project/${currentProject}/issues/${id}`,{
        method:'GET'
    })
    .then(response => {
        if (response.status == 200) {
            return response.json(); 
        } else if(response.status === 403){
            throw new Error('해당 프로젝트의 이슈를 조회할 권한이 없는 계정입니다.');
        } else{
            throw new Error('An error occured while get detail Issues');
        }
    })
    .then(data => {
        console.log('detailed Issues', data);
        currentViewIssue = data;
        if (currentViewIssue) {
            document.getElementById('viewModalTitle').innerText = currentViewIssue.title; // 모달 제목에 이슈 제목 표시
            document.getElementById('viewDescription').innerText = currentViewIssue.description;
            document.getElementById('viewReporter').innerText = currentViewIssue.reporter;
            document.getElementById('viewReportedDate').innerText = currentViewIssue.reported_date;
            document.getElementById('viewAssignee').innerText = currentViewIssue.assignee;
            document.getElementById('viewFixer').innerText = currentViewIssue.fixer;
            document.getElementById('viewPriority').innerText = currentViewIssue.priority;
            document.getElementById('viewStatus').innerText = currentViewIssue.status;
            document.getElementById('viewType').innerText = currentViewIssue.type;
            displayComments('editComments', currentViewIssue.comments, true);
            document.getElementById('viewModal').style.display = 'block';
        }
    })
}

// 이슈 조회 모달을 닫는 함수
function closeViewModal() {
    document.getElementById('viewModal').style.display = 'none';
}

// 이슈를 편집하는 함수
function editIssue(id) {
    console.log('editIssue',currentProject, id)
    fetch(`api/project/${currentProject}/issues/${id}`,{ // 편집할 때 상세 이슈 보는 api
        method:'GET'
    })
    .then(response => {
        if (response.status == 200) {
            return response.json(); 
        } else if(response.status === 403){
            throw new Error('해당 이슈를 편집할 수 있는 권한이 없습니다.');
        } else{
            throw new Error('An error occured while get detail Issues');
        }
    })
    .then(data=>{
        currentEditIssue = data;
        if (currentEditIssue) {
            loadAssigneeOptions('editAssignee');
            document.getElementById('editTitle').value = currentEditIssue.title;
            document.getElementById('editAssignee').value = currentEditIssue.assignee;
            document.getElementById('editPriority').value = currentEditIssue.priority;
            updateStatusOptions(currentEditIssue.status); // 이 부분 추가
            document.getElementById('editType').value = currentEditIssue.type;
            displayComments('viewComments', currentEditIssue.comments, false);
            document.getElementById('editModal').style.display = 'block';
        }
    })
    //currentEditIssue = sampleIssues.find(issue => issue.id == id);
    //console.log('currenteditissue',currentEditIssue.comments);
}

function updateStatusOptions(currentStatus) {
    const statusSelect = document.getElementById('editStatus');
    statusSelect.innerHTML = ''; // 기존 옵션 초기화

    // 상태에 따라 선택 옵션 업데이트
    switch (currentStatus) {
        case 'NEW':
            addStatusOption(statusSelect, 'NEW', 'NEW');
            break;
        case 'ASSIGNED':
            addStatusOption(statusSelect, 'ASSIGNED', 'ASSIGNED');
            addStatusOption(statusSelect, 'FIXED', 'FIXED');
            break;
        case 'FIXED':
            addStatusOption(statusSelect, 'FIXED', 'FIXED');
            addStatusOption(statusSelect, 'RESOLVED', 'RESOLVED');
            break;
        case 'RESOLVED':
            addStatusOption(statusSelect, 'RESOLVED', 'RESOLVED');
            addStatusOption(statusSelect, 'CLOSED', 'CLOSED');
            addStatusOption(statusSelect, 'REOPENED', 'REOPENED');
            break;
        case 'REOPENED':
            addStatusOption(statusSelect, 'REOPENED', 'REOPENED');
            break;
        case 'CLOSED':
            addStatusOption(statusSelect, 'CLOSED', 'CLOSED');
            break;
    }
}

function addStatusOption(select, value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
}

// 이슈 편집 모달을 닫는 함수
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

//STATUS 수정 함수
function saveEditStatusIssue(){
    if (currentEditIssue) {
        let beforeStatus = currentEditIssue.status;
        currentEditIssue.title = document.getElementById('editTitle').value;
        currentEditIssue.assignee = document.getElementById('editAssignee').value;
        currentEditIssue.priority = document.getElementById('editPriority').value;
        currentEditIssue.status = document.getElementById('editStatus').value;
        currentEditIssue.type = document.getElementById('editType').value;
        console.log('saveEditISsue : currnetEditIssue', currentEditIssue);
        console.log(beforeStatus, currentEditIssue.status);
        if(currentEditIssue.status == 'FIXED' && beforeStatus != 'FIXED'){
            fetch(`api/project/${currentProject}/issues/${currentEditIssue.id}`,{
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    fixer: currentEditIssue.assignee,
                    status : 'FIXED'
                })
            })
            .then(response=>{
                if(response.status == 200){
                    console.log('Fixed Issues');
                    // sampleIssues 배열에서 currentEditIssue.id와 동일한 id를 가진 issue를 찾아 수정
                    sampleIssues = sampleIssues.map(issue => {
                        if (issue.id === currentEditIssue.id) {
                            return {
                                ...issue,
                                fixer: currentEditIssue.assignee,
                                status: 'FIXED'
                            };
                        }
                        return issue;
                    });
                    displayIssues(sampleIssues, currentPage);
                    closeEditModal();
                } else if(response.status === 403){
                    throw new Error('해당 상태를 FIXED로 고칠 수 있는 권한이 없습니다.');
                } else{
                    return response.json().then(errorData => {
                        console.error('Error updating issue:', errorData);
                    });
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
        }
        else if(beforeStatus != currentEditIssue.status) {  
            fetch(`api/project/${currentProject}/issues/${currentEditIssue.id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    //title : currentEditIssue.title,
                    //description : currentEditIssue.description || '',
                    //assignee: currentEditIssue.assignee,
                    status : currentEditIssue.status,
                    //priority : currentEditIssue.priority,
                    //type : currentEditIssue.type
                })
            })
            .then(response=>{
                if(response.status == 200){
                    console.log('save Edit Issue!');

                    // sampleIssues 배열에서 currentEditIssue.id와 동일한 id를 가진 issue를 찾아 수정
                    sampleIssues = sampleIssues.map(issue => {
                        if (issue.id === currentEditIssue.id) {
                            return {
                                ...issue,
                                status: currentEditIssue.status
                            };
                        }
                        return issue;
                    });
                    displayIssues(sampleIssues, currentPage);
                    closeEditModal();
                } else if(response.status === 403){
                    throw new Error('해당 이슈의 상태를 고칠 권한이 없는 계정입니다.');
                } else{
                    return response.json().then(errorData => {
                        console.error('Error updating issue:', errorData);
                    });
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
        } else if(beforeStatus == currentEditIssue.status){
            alert('Status를 바꾸신 후 Save해주세요.');
        }
    }
}

// 이슈 편집 내용을 저장하는 함수
function saveEditIssue() {
    if (currentEditIssue) {
        beforeStatus = currentEditIssue.status;
        currentEditIssue.title = document.getElementById('editTitle').value;
        currentEditIssue.assignee = document.getElementById('editAssignee').value;
        currentEditIssue.priority = document.getElementById('editPriority').value;
        currentEditIssue.status = document.getElementById('editStatus').value;
        currentEditIssue.type = document.getElementById('editType').value;
        console.log('saveEditISsue : currnetEditIssue', currentEditIssue);
        if(currentEditIssue.assignee.length != 0 && currentEditIssue.status == 'NEW'){  
            fetch(`api/project/${currentProject}/issues/${currentEditIssue.id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    //title : currentEditIssue.title,
                    //description : currentEditIssue.description || '',
                    assignee: currentEditIssue.assignee,
                    status : 'ASSIGNED',
                    //priority : currentEditIssue.priority,
                    //type : currentEditIssue.type
                })
            })
            .then(response=>{
                if(response.status == 200){
                    console.log('save Edit Issue!');

                    // sampleIssues 배열에서 currentEditIssue.id와 동일한 id를 가진 issue를 찾아 수정
                    sampleIssues = sampleIssues.map(issue => {
                        if (issue.id === currentEditIssue.id) {
                            return {
                                ...issue,
                                assignee: currentEditIssue.assignee,
                                status: 'ASSIGNED'
                            };
                        }
                        return issue;
                    });
                    displayIssues(sampleIssues, currentPage);
                    closeEditModal();
                } else if(response.status === 403){
                    throw new Error('해당 이슈에 ASSIGNEE를 배정할 수 있는 권한이 없습니다.');
                } else{
                    return response.json().then(errorData => {
                        console.error('Error updating issue:', errorData);
                    });
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
        } 
        else{
            fetch(`api/project/${currentProject}/issues/${currentEditIssue.id}`,{
                method:'PATCH',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    title : currentEditIssue.title,
                    //description : currentEditIssue.description || '',
                    //assignee: currentEditIssue.assignee,
                    //status : currentEditIssue.status,
                    priority : currentEditIssue.priority,
                    type : currentEditIssue.type
                })
            })
            .then(response=>{
                if(response.status == 200){
                    console.log('save Edit Issue!');
    
                    // sampleIssues 배열에서 currentEditIssue.id와 동일한 id를 가진 issue를 찾아 수정
                    sampleIssues = sampleIssues.map(issue => {
                        if (issue.id === currentEditIssue.id) {
                            return {
                                ...issue,
                                title: currentEditIssue.title,
                                priority: currentEditIssue.priority,
                                type : currentEditIssue.type
                            };
                        }
                        return issue;
                    });
                    displayIssues(sampleIssues, currentPage);
                    closeEditModal();
                } else if(response.status === 403){
                    throw new Error('해당 이슈를 편집할 수 있는 권한이 없는 계정입니다.');
                } else{
                    return response.json().then(errorData => {
                        console.error('Error updating issue:', errorData);
                    });
                }
            })
            .catch(error => {
                console.error('Network error:', error);
            });
        }
    }
}

// 새로운 댓글을 추가하는 함수
function addComment() {
    const commentText = document.getElementById('newComment').value;
    console.log('addcomment', commentText);
    if (commentText && currentViewIssue) {
        fetch(`api/project/${currentProject}/issues/${currentViewIssue.id}/comments`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment : commentText
            })
        })
        .then(response =>{
            if (response.status == 201) {
                viewIssue(currentViewIssue.id);
                console.log('display 직전', currentViewIssue.comments)
                displayComments('editComments', currentViewIssue.comments, true);
                document.getElementById('newComment').value = '';
            } else if(response.status === 403){
                throw new Error('해당 이슈에 코멘트를 달 수 없는 계정입니다.');
            } else {
                throw new Error('Comment cannot saved with Error.');
            }
        })
        .catch(error=>{
            console.error(error.message);
            alert(error.message);
        })
    }
}

// 댓글을 편집하는 함수
function editComment(index) {
    currentViewCommentIndex = index;
    //console.log('editComment', currentEditIssue, 'index: ', currentEditCommentIndex);
    console.log('editComment', currentViewIssue.comments[index].comment);
    document.getElementById('editCommentModal').style.display = 'block';
    document.getElementById('editCommentText').value = currentViewIssue.comments[index].comment;
}

// 댓글 편집 모달 창에서 Save 버튼을 누르면 실행되는 함수
function saveEditedComment() {
    // 편집된 댓글 내용 가져오기
    const editedComment = document.getElementById('editCommentText').value;
    console.log('saveEditedComment', editedComment, currentViewCommentIndex, currentViewIssue.comments[currentViewCommentIndex].comment);

    fetch(`api/project/${currentProject}/issues/${currentViewIssue.id}/comments/${currentViewIssue.comments[currentViewCommentIndex].id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment:editedComment
        })
    })
    .then(response => {
        if(response.status == 200){
            console.log('comment 수정 완료');
            // 원본 댓글 내용 업데이트
            currentViewIssue.comments[currentViewCommentIndex].comment = editedComment;

            // 모달 창 닫기
            document.getElementById('editCommentModal').style.display = 'none';

            displayComments('editComments', currentViewIssue.comments, true);
        } else if(response.status === 403){
            throw new Error('해당 코멘트를 수정할 수 있는 권한이 없습니다.');
        } else{
            console.log('코멘트 수정 안됨.');
            alert('코멘트 수정 안됨')
        }
    })
    .catch(error => {
        console.error('Error', error);
    });

}

// 댓글 편집 모달을 닫는 함수
function closeEditCommentModal() {
    document.getElementById('editCommentModal').style.display = 'none';
}

// 댓글 편집 내용을 저장하는 함수 : 사용 X
/*
function saveEditComment() {
    if (currentEditCommentIndex !== null && currentEditIssue) {
        currentEditIssue.comments[currentEditCommentIndex].comment = document.getElementById('editCommentText').value;
        displayComments('editComments', currentEditIssue.comments, true);
        closeEditCommentModal();
    }
}
*/

// 댓글을 삭제하는 함수
function deleteComment(index) {
    console.log('딜리트 코멘트 함수', currentViewIssue.comments[index], index);
    if (currentViewIssue) {
        fetch(`api/project/${currentProject}/issues/${currentViewIssue.id}/comments/${currentViewIssue.comments[index].id}`,{
            method:'DELETE'
        })
        .then(response=>{
            if(response.status == 200){
                currentViewIssue.comments.splice(index, 1);
                displayComments('editComments', currentViewIssue.comments, true);
            } else if(response.status === 403){
                throw new Error('해당 코멘트를 삭제할 수 있는 권한이 없습니다.');
            } else if (response.status == 404){
                alert('해당하는 코멘트가 없습니다.');
            } else{
                throw new Error('comment delete error');
            }    
        })
        .catch(error => {
            console.error(error.message);
            alert(error.message);
        })
    }
}

// 댓글을 화면에 표시하는 함수
function displayComments(containerId, comments, isEditable) {
    const commentContainer = document.getElementById(containerId);
    commentContainer.innerHTML = '';
    console.log('displayComments',comments);
    comments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <div>
                <div class="comment-author">${comment.commenter}</div>
                <div class="comment-date">${comment.created_date}</div>
                <div class="comment-text">${comment.comment}</div>
            </div>
            ${isEditable ? `
            <div class="comment-actions">
                <button class="btn btn-edit" onclick="editComment(${index})">Edit</button>
                <button class="btn" onclick="deleteComment(${index})">Delete</button>
            </div>
            ` : ''}
        `;
        console.log('디스플레이 코멘트', index);
        commentContainer.appendChild(commentElement);
    });
}

// 이슈를 삭제하는 함수
function deleteIssue(title) {
    sampleIssues = sampleIssues.filter(issue => issue.title !== title);
    totalPages = Math.ceil(sampleIssues.length / issuesPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    displayIssues(sampleIssues, currentPage);
}

// 참여 유저 목록 모달 열기
function openUserListModal() {
    displayProjectUsers();
    document.getElementById('userListModal').style.display = 'block';
}

// 참여 유저 목록 모달 닫기
function closeUserListModal() {
    document.getElementById('userListModal').style.display = 'none';
}

// 현재 프로젝트의 참여 유저 목록을 표시하는 함수
function displayProjectUsers() {
    const userListBody = document.getElementById('user-list-body');
    userListBody.innerHTML = '';
    const users = projectUsers;

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.nickname}</td>
            <td>${user.role}</td>
        `;
        userListBody.appendChild(row);
    });
}

// 이슈 통계를 생성하는 함수
function generateStatistics() {
    const statisticType = document.getElementById('statisticType').value;
    const statisticsResult = document.getElementById('statisticsResult');
    const issues = sampleIssues;
    let statistics = {};

    fetch(`api/project/${currentProject}/statistics/time?time_unit=${statisticType}`,{
        method:'GET'
    })
    .then(response =>{
        if (response.status == 200){
            return response.json(); 
        } else if(response.status === 403){
            throw new Error('해당 프로젝트의 통계를 볼 수 없는 계정입니다..');
        } else{
            throw new Error('Issues Statistics has error');
        }
    })
    .then(data => {
        console.log('statistics', data);
        /*
        if (statisticType === 'DAY') {
            statistics = issues.reduce((acc, issue) => {
                const date = issue.reportedDate;
                if (!acc[date]) acc[date] = 0;
                acc[date]++;
                return acc;
            }, {});
        } else if (statisticType === 'MONTH') {
            statistics = issues.reduce((acc, issue) => {
                const date = issue.reportedDate.slice(0, 7); // YYYY-MM
                if (!acc[date]) acc[date] = 0;
                acc[date]++;
                return acc;
            }, {});
        } else if (statisticType === 'YEAR') {
            statistics = issues.reduce((acc, issue) => {
                const date = issue.reportedDate.slice(0, 4); // YYYY
                if (!acc[date]) acc[date] = 0;
                acc[date]++;
                return acc;
            }, {});
        }
        */
        statisticsResult.innerHTML = '<h3>Statistics Result</h3>';
        data.forEach((item) => {
            statisticsResult.innerHTML += `<p>${item.time}: ${item.count} issues</p>`;
        });
    })
    .catch(error => {
        console.error('Error:', error);
        statisticsResult.innerHTML = '<h3>Statistics Result</h3><p>Error loading statistics</p>';
    });
}

// 이슈 통계 모달 열기
function openIssueStatisticsModal() {
    generateStatistics();
    document.getElementById('issueStatisticsModal').style.display = 'block';
}

// 이슈 통계 모달 닫기
function closeIssueStatisticsModal() {
    document.getElementById('issueStatisticsModal').style.display = 'none';
}

// Assignee 옵션을 로드하는 함수
function loadAssigneeOptions(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    console.log('loadAssigneeOptions', projectUsers);
    const devUsers = projectUsers.filter(user => user.role[0] == 'PARTICIPANT');

    devUsers.forEach(user => {
        const option = document.createElement('option');
        option.value = user.nickname;
        option.text = user.nickname;
        select.appendChild(option);
    });
}

displayProjects(); // 초기 프로젝트 데이터를 가져옵니다.