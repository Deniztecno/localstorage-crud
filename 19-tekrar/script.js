let userList = [];
let getUserList;
let nameListDOM = document.querySelector("#nameList");
function Read(){
  nameListDOM.innerHTML = "";
  getUserList = JSON.parse(localStorage.getItem("users"));
  if(getUserList.length === 0){
    nameListDOM.innerHTML = "there are no any users";
  }
  else{
    for (let i = 0; i < getUserList.length; i++) {
      nameListDOM.innerHTML += `
      <div class="user-item">
                <p>
                    <i class=" fas fa-user"></i>
                    <span>User :</span> ${getUserList[i]}
                </p>
                <div class="buttons">
                    <button class="primary" onclick="Edit(${i})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="danger" onclick="Delete(${i})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
    `;
    }
  }
}
function Create(){
  const storage = JSON.parse(localStorage.getItem("users"));
  let inputValue = document.querySelector("#name").value;
  if (inputValue == "") {
    alert("İnput alanı boş geçilemez");
  }
  else{
    if(storage === null){
      userList.push(inputValue);
      localStorage.setItem("users", JSON.stringify(userList));
    } 
    else{
      userList = JSON.parse(localStorage.getItem("users"));
      userList.push(inputValue);
      localStorage.setItem("users", JSON.stringify(userList));
    }
  }
}

function Delete(item){
  let deleteUser = JSON.parse(localStorage.getItem("users"));
  deleteUser.splice(item,1);
  localStorage.setItem("users", JSON.stringify(deleteUser));
  Read();
}

function Edit(item){
  let editUser = JSON.parse(localStorage.getItem("users"));
  nameListDOM.innerHTML = "";
  for (let i = 0; i < editUser.length; i++) {
    if(i == item){
      nameListDOM.innerHTML += `
        <div class="user-item">
                <div>
                    <p>
                        <i class=" fas fa-user"></i>
                        <span>User :</span> ${editUser[i]}
                    </p>
                    <input type="text" id="newName" placeholder="Edit Name: ${editUser[i]}"   />
                </div>
                <div class="buttons">
                    <button class="success" onclick="Update(${i})">
                        <i class="fas fa-edit"></i>
                        Update
                    </button>
                    <button class="warning" onclick="Read()">
                        <i class="fas fa-trash"></i>
                        Cancel
                    </button>
                </div>
            </div>
      `;
    }
    else{
      nameListDOM.innerHTML += `
        <div class="user-item">
                <p>
                    <i class=" fas fa-user"></i>
                    <span>User :</span> ${getUserList[i]}
                </p>
                <div class="buttons">
                    <button class="primary" onclick="Edit(${i})">
                        <i class="fas fa-edit"></i>
                        Edit
                    </button>
                    <button class="danger" onclick="Delete(${i})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
      `;
    }
  }
}

function Update(item){
  const updateUsers = JSON.parse(localStorage.getItem("users"));
  updateUsers[item] = document.getElementById("newName").value;
  if(updateUsers[item] == ""){
    alert("write a new name");
  }
  else{
    localStorage.setItem("users", JSON.stringify(updateUsers));
    Read();
  }
}

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  Create();
  Read();
  document.querySelector("form").reset();
})
window.addEventListener("DOMContentLoaded", () => {
  Read();
})