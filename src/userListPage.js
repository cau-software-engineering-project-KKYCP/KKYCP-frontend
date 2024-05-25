// 프로젝트별 유저 데이터 샘플 (예시). 실제 유저 데이터는 백엔드에서 가져옵니다.
// 백엔드 개발자가 구현해야 할 작업:
// 1. 특정 프로젝트에 속한 유저 정보를 데이터베이스에서 조회합니다.
// 2. 조회된 유저 정보를 JSON 형식으로 프론트엔드에 반환하는 API를 구현합니다.
// 3. 프론트엔드에서 해당 API를 호출하여 데이터를 받아와야 합니다.
// 예시 API 엔드포인트: GET /api/projects/{projectId}/users
const projectUserData = {
    'Project 1': [
        { id: 'user1', nickname: 'User One', role: 'PL' },
        { id: 'user2', nickname: 'User Two', role: 'dev' },
        { id: 'user3', nickname: 'User Three', role: 'tester' },
    ],
    'Project 2': [
        { id: 'user4', nickname: 'User Four', role: 'dev' },
        { id: 'user5', nickname: 'User Five', role: 'PL' },
        { id: 'user6', nickname: 'User Six', role: 'tester' },
    ],
    'Project 3': [
        { id: 'user7', nickname: 'User Seven', role: 'dev' },
        { id: 'user8', nickname: 'User Eight', role: 'PL' },
        { id: 'user9', nickname: 'User Nine', role: 'tester' },
    ]
};

let currentProject = null;
let filteredUsers = [];
let currentEditUser = null;
const usersPerPage = 20;
let currentUserPage = 1;
let totalUserPages = 1;

// URL 파라미터에서 프로젝트 이름 가져오기
const urlParams = new URLSearchParams(window.location.search);
currentProject = urlParams.get('project');
filteredUsers = projectUserData[currentProject] || [];
totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);

// 유저 리스트를 화면에 표시하는 함수
function displayUsers(users, page) {
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = '';

    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${start + index + 1}</td>
                    <td>${user.id}</td>
                    <td>${user.nickname}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="btn" onclick="editUser(${start + index})">Edit</button>
                        <button class="btn" onclick="deleteUser(${start + index})">Del</button>
                    </td>
                `;
        userTableBody.appendChild(row);
    });

    updatePagination(users, page, 'user-pagination');
}

// 권한 필터링 함수
function filterUsers() {
    const roleFilter = document.getElementById('roleFilter').value;
    if (roleFilter === '') {
        filteredUsers = projectUserData[currentProject];
    } else {
        filteredUsers = projectUserData[currentProject].filter(user => user.role === roleFilter);
    }
    totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);
    displayUsers(filteredUsers, 1);
}

// 유저 편집 함수 (모달 열기)
function editUser(index) {
    currentEditUser = filteredUsers[index];
    document.getElementById('editUserId').innerText = currentEditUser.id;
    document.getElementById('editUserNickname').innerText = currentEditUser.nickname;
    document.getElementById('editUserRole').value = currentEditUser.role;
    document.getElementById('editUserModal').style.display = 'block';
}

// 유저 편집 모달 닫기
function closeEditUserModal() {
    document.getElementById('editUserModal').style.display = 'none';
}

// 유저 편집 내용을 저장하는 함수
function saveEditUser() {
    if (currentEditUser) {
        currentEditUser.role = document.getElementById('editUserRole').value;
        displayUsers(filteredUsers, currentUserPage);
        closeEditUserModal();
    }
}

// 유저 삭제 함수
function deleteUser(index) {
    const userId = filteredUsers[index].id;
    projectUserData[currentProject] = projectUserData[currentProject].filter(user => user.id !== userId);
    filterUsers();
}

// 새로운 유저 추가 모달 열기
function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
    displayAllUsers(allUsers, 1);
}

// 새로운 유저 추가 모달 닫기
function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
}

// 모든 유저 데이터 (샘플)
// 백엔드 개발자가 구현해야 할 작업:
// 1. 전체 유저 정보를 데이터베이스에서 조회합니다.
// 2. 조회된 유저 정보를 JSON 형식으로 프론트엔드에 반환하는 API를 구현합니다.
// 3. 프론트엔드에서 해당 API를 호출하여 데이터를 받아와야 합니다.
// 예시 API 엔드포인트: GET /api/users
const allUsers = [
    { id: 'user1', nickname: 'User One', participated: ['Project 1'] },
    { id: 'user2', nickname: 'User Two', participated: ['Project 1'] },
    { id: 'user3', nickname: 'User Three', participated: ['Project 1'] },
    { id: 'user4', nickname: 'User Four', participated: ['Project 2'] },
    { id: 'user5', nickname: 'User Five', participated: ['Project 2'] },
    { id: 'user6', nickname: 'User Six', participated: ['Project 2'] },
    { id: 'user7', nickname: 'User Seven', participated: ['Project 3'] },
    { id: 'user8', nickname: 'User Eight', participated: ['Project 3'] },
    { id: 'user9', nickname: 'User Nine', participated: ['Project 3'] },
    { id: 'user10', nickname: 'User Ten', participated: [] },
    { id: 'user11', nickname: 'User Eleven', participated: [] },
    { id: 'user12', nickname: 'User Twelve', participated: [] },
    { id: 'user13', nickname: 'User Thirteen', participated: [] },
    { id: 'user14', nickname: 'User Fourteen', participated: [] },
    { id: 'user15', nickname: 'User Fifteen', participated: [] },
    { id: 'user16', nickname: 'User Sixteen', participated: [] },
    { id: 'user17', nickname: 'User Seventeen', participated: [] },
    { id: 'user18', nickname: 'User Eighteen', participated: [] },
    { id: 'user19', nickname: 'User Nineteen', participated: [] },
    { id: 'user20', nickname: 'User Twenty', participated: [] },
    { id: 'user21', nickname: 'User Twenty-One', participated: [] },
    { id: 'user22', nickname: 'User Twenty-Two', participated: [] },
    { id: 'user23', nickname: 'User Twenty-Three', participated: [] },
    { id: 'user24', nickname: 'User Twenty-Four', participated: [] },
    { id: 'user25', nickname: 'User Twenty-Five', participated: [] }
];

let totalAllUserPages = Math.ceil(allUsers.length / usersPerPage);

// 선택된 유저 데이터 (샘플)
const selectedUsers = [];

// 모든 유저 리스트를 화면에 표시하는 함수
function displayAllUsers(users, page) {
    const allUserTableBody = document.getElementById('all-user-table-body');
    allUserTableBody.innerHTML = '';

    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${start + index + 1}</td>
                    <td>${user.id}</td>
                    <td>${user.nickname}</td>
                    <td>${user.participated.join(', ')}</td>
                    <td><button class="btn" onclick="addUser(${start + index})">Add</button></td>
                `;
        allUserTableBody.appendChild(row);
    });

    updatePagination(users, page, 'all-user-pagination');
}

// 선택된 유저 리스트를 화면에 표시하는 함수
function displaySelectedUsers() {
    const selectedUserTableBody = document.getElementById('selected-user-table-body');
    selectedUserTableBody.innerHTML = '';

    selectedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.id}</td>
                    <td>${user.nickname}</td>
                    <td>
                        <select onchange="updateUserRole(${index}, this.value)">
                            <option value="PL">PL</option>
                            <option value="dev">dev</option>
                            <option value="tester">tester</option>
                        </select>
                    </td>
                `;
        selectedUserTableBody.appendChild(row);
    });
}

// 유저 추가 함수
function addUser(index) {
    const user = allUsers[index];
    if (!selectedUsers.find(u => u.id === user.id)) {
        selectedUsers.push({ ...user, role: 'PL' }); // 기본 역할 PL로 추가
        displaySelectedUsers();
    }
}

// 유저 역할 업데이트 함수
function updateUserRole(index, role) {
    selectedUsers[index].role = role;
}

// 선택된 유저 저장 함수
function saveAddedUsers() {
    // selectedUsers를 백엔드에 저장하는 로직 필요
    closeAddUserModal();
    // 화면 갱신
    selectedUsers.forEach(user => {
        projectUserData[currentProject].push(user);
    });
    filterUsers();
}

// 페이지네이션 업데이트 함수
function updatePagination(items, page, paginationId) {
    const pagination = document.getElementById(paginationId);
    pagination.innerHTML = '';

    const totalPages = Math.ceil(items.length / usersPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === page) {
            button.classList.add('disabled');
            button.disabled = true;
        } else {
            button.onclick = () => changePage(i, items, paginationId);
        }
        pagination.appendChild(button);
    }
}

// 페이지 변경 함수
function changePage(page, items, paginationId) {
    if (paginationId === 'user-pagination') {
        currentUserPage = page;
        displayUsers(items, page);
    } else if (paginationId === 'all-user-pagination') {
        displayAllUsers(items, page);
    }
}

// 초기 유저 리스트 표시
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('header h1').textContent = `User List for ${currentProject}`;
    filterUsers();
    displayAllUsers(allUsers, 1);
});