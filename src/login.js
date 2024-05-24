// base64 인코딩 함수
function base64Encode(str) {
    return btoa(str);
}
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    
    if(loginForm){
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault(); // 폼의 기본 제출 동작을 방지

            // FormData 객체를 사용하여 폼 데이터를 준비
            const formData = new FormData(loginForm); // 수정: loginForm을 기반으로 FormData 객체 생성
            const data = new URLSearchParams(formData); // URLSearchParams로 변환

            // fetch API를 사용하여 로그인 요청
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data,
                credentials : 'include',
            })
            .then(response => {
                if (response.ok) {
                    console.log("로그인 성공: 200");
                    window.location.href = 'startPage.html';
                }
                else{
                    return response.text().then(text => { throw new Error(text); });
                }
            })
            .catch(error => {
                console.error('로그인 에러:', error);
            });
        });
    }
});