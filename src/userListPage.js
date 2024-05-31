// 프로젝트별 유저 데이터 샘플 (예시). 실제 유저 데이터는 백엔드에서 가져옵니다.
// 백엔드 개발자가 구현해야 할 작업:
// 1. 특정 프로젝트에 속한 유저 정보를 데이터베이스에서 조회합니다.
// 2. 조회된 유저 정보를 JSON 형식으로 프론트엔드에 반환하는 API를 구현합니다.
// 3. 프론트엔드에서 해당 API를 호출하여 데이터를 받아와야 합니다.
// 예시 API 엔드포인트: GET /api/projects/{projectId}/users
const projectUserData = [];
/*
1: [
    { id: 'user1', nickname: 'User One', role: 'PL' },
    { id: 'user2', nickname: 'User Two', role: 'dev' },
    { id: 'user3', nickname: 'User Three', role: 'tester' },
],
2: [
    { id: 'user4', nickname: 'User Four', role: 'dev' },
    { id: 'user5', nickname: 'User Five', role: 'PL' },
    { id: 'user6', nickname: 'User Six', role: 'tester' },
],
3: [
    { id: 'user7', nickname: 'User Seven', role: 'dev' },
    { id: 'user8', nickname: 'User Eight', role: 'PL' },
    { id: 'user9', nickname: 'User Nine', role: 'tester' },
]
*/


let currentProjectId = null;
let filteredUsers = [];
let currentEditUser = [];
const usersPerPage = 20;
let currentUserPage = 1;
let totalUserPages = 1;

// URL 파라미터에서 프로젝트 이름 가져오기
const urlParams = new URLSearchParams(window.location.search);
currentProjectId = urlParams.get('projectId');
filteredUsers = projectUserData[currentProjectId] || [];
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
        filteredUsers = projectUserData;
        console.log(filteredUsers);
    } else {
        filteredUsers = projectUserData.filter(user =>{
             // user.role이 배열인지 확인
             if (Array.isArray(user.role)) {
                // 배열의 값 중 하나라도 roleFilter와 일치하면 true 반환
                return user.role.includes(roleFilter);
            } else {
                // user.role이 단일 값인 경우 단순 비교
                return user.role === roleFilter;
            }
        });
    }
    totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);
    displayUsers(filteredUsers, 1);
}

// 유저 편집 함수 (모달 열기)
function editUser(index) {
    currentEditUser = filteredUsers[index];
    document.getElementById('editUserId').innerText = currentEditUser.id;
    document.getElementById('editUserNickname').innerText = currentEditUser.nickname;

    console.log(currentEditUser.role);
    // 기존 역할 스피너 초기화
    const roleContainer = document.getElementById('roleContainer');
    roleContainer.innerHTML = '';

    // 유저의 모든 역할을 스피너로 추가 (첫 번째 역할 PARTICIPANT는 제외)
    const roles = currentEditUser.role;
    roles.slice(1).forEach(role => {
        const newRoleSelect = document.createElement('select');
        newRoleSelect.className = 'editUserRole';
        newRoleSelect.innerHTML = `
            <option value="REPORTER">REPORTER</option>
            <option value="TRIAGER">TRIAGER</option>
            <option value="TESTER">TESTER</option>
            <option value="VERIFIER">VERIFIER</option>
        `;
        newRoleSelect.value = role;
        roleContainer.appendChild(newRoleSelect);
    });

    if (roles.length === 0) {
        // 기본 스피너 하나 추가 (유저 역할이 없을 때만)
        addRoleSpinner();
    }

    document.getElementById('editUserModal').style.display = 'block';
}

// 유저 편집 모달 닫기
function closeEditUserModal() {
    document.getElementById('editUserModal').style.display = 'none';
}

// 역할 선택 스피너를 추가하는 함수
function addRoleSpinner() {
    const roleContainer = document.getElementById('roleContainer');
    const newRoleSelect = document.createElement('select');
    newRoleSelect.className = 'editUserRole';
    newRoleSelect.innerHTML = `
        <option value="REPORTER">REPORTER</option>
        <option value="TRIAGER">TRIAGER</option>
        <option value="TESTER">TESTER</option>
        <option value="VERIFIER">VERIFIER</option>
    `;
    roleContainer.appendChild(newRoleSelect);
}

// 역할 선택 스피너를 삭제하는 함수
function removeRoleSpinner() {
    const roleContainer = document.getElementById('roleContainer');
    const lastRoleSelect = roleContainer.querySelector('select:last-of-type');
    if (lastRoleSelect) {
        roleContainer.removeChild(lastRoleSelect);
    }
}

// 유저 편집 내용을 저장하는 함수
function saveEditUser() {
    if (currentEditUser) {
        const roleSelects = document.querySelectorAll('.editUserRole');
        let selectedRoles = [];
        roleSelects.forEach(select => {
            if (select.value) {
                selectedRoles.push(select.value);
            }
        });
        // 첫 번째 요소(PARTICIPANT) 보존하고, 두 번째 요소부터 selectedRoles로 대체
        if (currentEditUser.role && currentEditUser.role.length > 0) {
            currentEditUser.role = [currentEditUser.role[0], ...selectedRoles];
        } else {
            currentEditUser.role = selectedRoles;
        }

        fetch(`/api/project/${currentProjectId}/privileges?username=${currentEditUser.nickname}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(selectedRoles)
        })
            .then(response => {
                if (response.status == 200) {
                    console.log('유저 권한 수정 성공');
                    filterUsers();
                    closeEditUserModal();
                } else if(response.status === 403){
                    throw new Error('User 권한 수정이 불가능한 권한을 가진 계정입니다.');
                } else {
                    throw new Error('User privileges change occur error');
                }
            })
            .catch(error => {
                console.error(error.message);
                alert(error.message);
            });
    }
}

// 유저 삭제 함수 : 현재 사용 X
function deleteUser(index) {
    alert('유저 삭제 기능은 준비중입니다.');
    /*
    const userId = filteredUsers[index].id;
    projectUserData = projectUserData.filter(user => user.id !== userId);
    filterUsers();
    */
}

// 새로운 유저 추가 모달 열기
function openAddUserModal() {
    selectedUsers = [];
    document.getElementById('usernameInput').value = '';
    document.getElementById('selected-user-table-body').innerHTML = '';
    document.getElementById('addUserModal').style.display = 'block';
    console.log('selectedUSers', selectedUsers);
    //displayAllUsers(allUsers, 1);
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
    /*
    { id: 'test', nickname: 'test', participated: ['Project 1'] },
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
    */
];

let totalAllUserPages = Math.ceil(allUsers.length / usersPerPage);

// 선택된 유저 데이터 (샘플)
let selectedUsers = [];

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
                    <td>${user.nickname}</td>
                    <td>${user.participated.join(', ')}</td>
                    <td><button class="btn" onclick="addUser(${start + index})">Add</button></td>
                `;
        allUserTableBody.appendChild(row);
    });

    updatePagination(users, page, 'all-user-pagination');
    console.log('디스플레이 끝');
}

// 선택된 유저 리스트를 화면에 표시하는 함수
function displaySelectedUsers() {
    const selectedUserTableBody = document.getElementById('selected-user-table-body');
    selectedUserTableBody.innerHTML = '';

    selectedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td><input type="checkbox" class="user-checkbox"></td>
                    <td>${index + 1}</td>
                    <td class="user-nickname">${user.nickname}</td>
                    <td>
                        PARTICIPANT
                    </td>
                `;
        selectedUserTableBody.appendChild(row);
    });
}

// 유저 추가 함수
function addUser() {
    let nameInput = document.getElementById('usernameInput')
    console.log('nameInput', nameInput);
    if (nameInput.value) {
        let usernameInput = nameInput.value
        selectedUsers.push({ nickname: usernameInput, role: ['PARTICIPANT'] });
        displaySelectedUsers();
    }
    else{
        alert('유저명을 먼저 입력해주세요!');
    }
    /*
    console.log('addUser 테스트중', usernameInput)
    fetch(`api/project/${currentProjectId}/users?username=${usernameInput}`, {
        method:'GET'
    })
    .then(response=>{
        if(response.status == 200){
            return response.json();
        } else{
            throw new Error('There are error find a user');
        }
    })
    .then(data=>{
        console.log('A User Finded', data);
        let findusername = data[0];
        selectedUsers.push({nickname:findusername, role: 'PL'});// 기본 역할 PL로 추가
        displaySelectedUsers();
    })
}
*/
    /*
    const user = allUsers[index];
    if (!selectedUsers.find(u => u.id === user.id)) {
        selectedUsers.push({ ...user, role: 'PL' }); 
        displaySelectedUsers();
    }
    */
}

// 유저 역할 업데이트 함수
function updateUserRole(index, role) {
    selectedUsers[index].role = role;
}

// 선택된 유저 저장 함수
function saveAddedUsers() {
    // selectedUsers를 백엔드에 저장하는 로직 필요
    for (let user of selectedUsers) {
        console.log(user.nickname)
        console.log(selectedUsers)
        fetch(`/api/project/${currentProjectId}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                username: user.nickname
            })
        })
            .then(response => {
                if (response.status == 200) {
                    console.log(user);
                    projectUserData.push(user);
                    closeAddUserModal();
                    filterUsers();
                }else if(response.status === 403){
                    throw new Error('프로젝트에 유저를 추가할 권한이 없는 계정입니다.');
                } else if (response.status === 404) {
                    throw new Error('User Added Failed: The project id is not exists or user is not exists.');
                } else {
                    throw new Error('Unknown Error Occured');
                }
            })
            .catch(error => {
                console.error(error.message);
                alert(error.message);
            })
    }


    // 화면 갱신
    /*
    selectedUsers.forEach(user => {
        projectUserData[currentProject].push(user);
    });
    */

}

function deleteAddedUsers(){
    const userCheckboxes = document.querySelectorAll('.user-checkbox');
    const selectedUserTableBody = document.getElementById('selected-user-table-body');
    const selectedUserRows = selectedUserTableBody.querySelectorAll('tr');
    console.log('유저테이블바디',selectedUserTableBody);

    // 체크된 사용자의 행을 찾아 삭제하는 로직
    for (let i = userCheckboxes.length - 1; i >= 0; i--) {
        const checkbox = userCheckboxes[i];
        if (checkbox.checked) {
            const userRow = selectedUserRows[i];
            const userNickname = userRow.querySelector('.user-nickname').textContent;
            const userIndex = selectedUsers.findIndex(user => user.nickname === userNickname);
            
            console.log('유저 정보', userNickname, userIndex, selectedUsers);
            if (userIndex !== -1) {
                // selectedUsers 배열에서 해당 사용자 제거
                selectedUsers.splice(userIndex, 1);
                console.log('deleteSelectedUsers', selectedUsers);

                displaySelectedUsers();
            }
        }
    }
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
    document.querySelector('header h1').textContent = `User List for projectId : ${currentProjectId}`;
    fetch(`api/project/${currentProjectId}/users`, {
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
                projectUserData.push({ nickname: user.username });
            });
            fetch(`api/project/${currentProjectId}/privileges`, {
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
                        let user = projectUserData.find(u => u.nickname === privilegeInfo.username);
                        if (user) {
                            user.role = privilegeInfo.privileges;
                        }
                    });
                    console.log('Updated projectUserData with roles', projectUserData);
                    filterUsers();
                    displayAllUsers(filteredUsers, 1);
                })
            console.log('added completed', projectUserData);
        })
        .catch(error => {
            console.error('Error', error);
        });
});