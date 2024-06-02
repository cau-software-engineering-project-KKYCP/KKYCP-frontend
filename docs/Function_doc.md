# <<mainPage.html 설명>>

## 1. 전역변수 관련

const sampleIssues = { ... };
+ // 샘플 데이터. 실제 DB와 연동 시 이 부분은 삭제하고 백엔드에서 데이터를 가져오는 코드로 대체

let currentProject = 'project-1';
+ // 현재 선택된 프로젝트를 나타내는 변수

let currentViewIssue = null;
+ // 현재 조회 중인 이슈를 나타내는 변수

let currentEditIssue = null;
+ // 현재 편집 중인 이슈를 나타내는 변수

let currentEditCommentIndex = null;
+ // 현재 편집 중인 댓글의 인덱스를 나타내는 변수

let loggedInUser = 'currentUser';
+ // 현재 로그인된 사용자의 닉네임을 나타내는 변수

## 2. 함수 관련

function displayIssues(issues) { ... }
+ // 이 함수는 주어진 이슈 목록을 화면에 표시합니다.
+ // 백엔드에서 데이터를 가져와서 이 함수를 호출하여 이슈를 표시할 수 있습니다.

function searchIssues() { ... }
+ // 이 함수는 검색어와 옵션을 기반으로 이슈를 필터링합니다.
+ // 백엔드에서 검색어를 받아와서 필터링된 결과를 반환하도록 수정할 수 있습니다.

function filterIssues() { ... }
+ // 이 함수는 우선순위, 상태, 날짜 필터를 적용하여 이슈를 필터링합니다.
+ // 백엔드에서 필터 조건을 받아와서 필터링된 결과를 반환하도록 수정할 수 있습니다.

function handleKeyPress(event) { ... }
+ // 이 함수는 검색 입력창에서 엔터 키를 누를 때 검색을 수행합니다.

function handleCommentKeyPress(event) { ... }
+ // 이 함수는 댓글 입력창에서 엔터 키를 누를 때 댓글을 추가합니다.

function createIssue() { ... }
+ // 이 함수는 새로운 이슈를 생성합니다.
+ // 백엔드와 연동하여 새로운 이슈를 생성하는 로직을 추가해야 합니다.

function viewIssue(title) { ... }
+ // 이 함수는 선택한 이슈의 상세 정보를 모달 창에 표시합니다.
+ // 백엔드에서 이슈 데이터를 가져와서 표시하도록 수정할 수 있습니다.

function closeViewModal() { ... }
+ // 이 함수는 이슈 조회 모달 창을 닫습니다.

function editIssue(title) { ... }
+ // 이 함수는 선택한 이슈의 편집 모달 창을 엽니다.
+ // 백엔드에서 이슈 데이터를 가져와서 표시하도록 수정할 수 있습니다.

function closeEditModal() { ... }
+ // 이 함수는 이슈 편집 모달 창을 닫습니다.

function saveEditIssue() { ... }
+ // 이 함수는 편집된 이슈 내용을 저장합니다.
+ // 백엔드와 연동하여 수정된 이슈 데이터를 저장하는 로직을 추가해야 합니다.

function addComment() { ... }
+ // 이 함수는 새로운 댓글을 추가합니다.
+ // 백엔드와 연동하여 새로운 댓글을 저장하는 로직을 추가해야 합니다.

function editComment(index) { ... }
+ // 이 함수는 선택한 댓글을 편집 모달 창에 표시합니다.

function closeEditCommentModal() { ... }
+ // 이 함수는 댓글 편집 모달 창을 닫습니다.

function saveEditComment() { ... }
+ // 이 함수는 편집된 댓글 내용을 저장합니다.

function deleteComment(index) { ... }
+ // 이 함수는 선택한 댓글을 삭제합니다.
+ // 백엔드와 연동하여 댓글을 삭제하는 로직을 추가해야 합니다.

function displayComments(containerId, comments, isEditable) { ... }
+ // 이 함수는 주어진 댓글 목록을 화면에 표시합니다.
+ // isEditable이 true인 경우 댓글 수정 및 삭제 버튼을 추가합니다.

function deleteIssue(title) { ... }
+ // 이 함수는 선택한 이슈를 삭제합니다.
+ // 백엔드와 연동하여 이슈를 삭제하는 로직을 추가해야 합니다.

function changeProject() { ... }
+ // 이 함수는 선택한 프로젝트에 따라 이슈 목록을 갱신합니다.
+ // 백엔드와 연동하여 프로젝트에 해당하는 이슈 데이터를 가져오는 로직을 추가해야 합니다.

displayIssues(sampleIssues[currentProject]);
+ // 초기 이슈 리스트 표시

# <<startPage.html 설명>>

## 1. 전역변수 관련

const sampleProjects = [
    { name: 'Project 1', createdDate: '2024-01-01', createdBy: 'Admin 1' },
    { name: 'Project 2', createdDate: '2024-02-01', createdBy: 'Admin 2' },
    { name: 'Project 3', createdDate: '2024-03-01', createdBy: 'Admin 3' }
];
+ // 샘플 프로젝트 데이터. 실제 DB와 연동 시 이 부분은 삭제하고 백엔드에서 데이터를 가져오는 코드로 대체

let currentEditProjectIndex = null;
+ // 현재 편집 중인 프로젝트의 인덱스를 나타내는 변수

## 2. 함수 관련

function displayProjects(projects) { ... }
+ // 이 함수는 주어진 프로젝트 목록을 화면에 표시합니다.

function viewProject(index) { ... }
+ // 이 함수는 선택한 프로젝트를 조회하여 mainPage.html로 연결합니다.
+ // URL 파라미터로 프로젝트 이름을 전달하여 mainPage.html에서 해당 프로젝트를 선택할 수 있도록 합니다.

function editProject(index) { ... }
+ // 이 함수는 선택한 프로젝트의 편집 모달 창을 엽니다.

function closeEditProjectModal() { ... }
+ // 이 함수는 프로젝트 편집 모달 창을 닫습니다.

function saveEditProject() { ... }
+ // 이 함수는 편집된 프로젝트 이름을 저장합니다.
+ // 백엔드와 연동하여 수정된 프로젝트 데이터를 저장하는 로직을 추가해야 합니다.

function deleteProject(index) { ... }
+ // 이 함수는 선택한 프로젝트를 삭제합니다.
+ // 백엔드와 연동하여 프로젝트를 삭제하는 로직을 추가해야 합니다.

function openCreateProjectModal() { ... }
+ // 이 함수는 새로운 프로젝트를 생성하기 위한 모달 창을 엽니다.

function closeCreateProjectModal() { ... }
+ // 이 함수는 새로운 프로젝트를 생성하기 위한 모달 창을 닫습니다.

function saveCreateProject() { ... }
+ // 이 함수는 새로운 프로젝트를 생성합니다.
+ // 프로젝트 이름과 생성자를 입력받아 새로운 프로젝트를 생성하고 리스트에 추가합니다.

const loggedInUser = 'currentUser'; 
+ // 현재 로그인한 사용자의 닉네임을 나타내는 변수

function saveCreateProject() {
    const name = document.getElementById('createProjectName').value;
    const description = document.getElementById('createProjectDescription').value;
    const createdDate = new Date().toISOString().split('T')[0];
    const createdBy = loggedInUser;
    if (name && description) {
        sampleProjects.push({ name, description, createdDate, createdBy });
        displayProjects(sampleProjects);
        closeCreateProjectModal();
    }
}

# <<login.html 백엔드 작업 관련>>

## 1. 로그인 API 엔드포인트 구현:
POST /api/login 엔드포인트를 생성하여 로그인 요청을 처리합니다.
요청 바디에서 userid와 password를 읽습니다.
데이터베이스에서 해당 사용자 정보를 조회하여 비밀번호를 검증합니다.
비밀번호가 일치하면 성공 응답을 반환하고, 일치하지 않으면 실패 응답을 반환합니다.

## 2. 세션 관리:

로그인 성공 시 세션을 생성하고 사용자 정보를 세션에 저장합니다.
각 페이지 요청 시 세션을 확인하여 로그인 상태를 유지합니다.

# <<register.html 백엔드 작업 관련>>

## 1. 회원가입 API 엔드포인트 구현:
POST /api/register 엔드포인트를 생성하여 회원가입 요청을 처리합니다.
요청 바디에서 nickname, userid, password를 읽습니다.
데이터베이스에 새로운 사용자 정보를 저장합니다.
비밀번호는 해시하여 저장해야 합니다.

## 2. 데이터베이스에 사용자 정보 저장:
실제 구현에서는 데이터베이스에 사용자 정보를 저장합니다.
비밀번호는 해시 함수를 사용하여 안전하게 저장해야 합니다.

## 3. 유효성 검사 및 에러 처리:
입력된 데이터의 유효성을 검사합니다.
예를 들어, ID가 이미 존재하는지, 비밀번호가 충분히 강력한지 등을 검사합니다.
필요한 경우 적절한 에러 메시지를 반환합니다.
