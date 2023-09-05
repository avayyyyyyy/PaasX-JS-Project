let tb = document.querySelector("table");

const deletePasswords = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  let arrUpdated = arr.filter((e) => {
    return e.Website !== website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  showPassword();
  alert(`Password Deleted: ${website}`);
};

const copyToClipboard = (text) => {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Data copied to clipboard: " + text);
};
const showPassword = () => {
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length === 0) {
    tb.innerHTML = "No saved passwords.";
  } else {
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      const maskedPassword = "*".repeat(element.Password.length);

      str += `<tr>
        <td class="p-2 font-semibold">
          ${element.Website}
          <span class="hover:cursor-pointer">
            <i class="ri-clipboard-line" onclick="copyToClipboard('${element.Website}')"></i>
          </span>
        </td>
        <td class="p-2 font-semibold">
          ${element.Username}
          <span class="hover:cursor-pointer">
            <i class="ri-clipboard-line" onclick="copyToClipboard('${element.Username}')"></i>
          </span>
        </td>
        <td class="p-2 font-semibold">
          ${maskedPassword}
          <span class="hover:cursor-pointer">
            <i class="ri-clipboard-line" onclick="copyToClipboard('${element.Password}')"></i>
          </span>
        </td>
        <td class="p-2 font-semibold">
          <button class="bg-black p-2 text-white rounded-md ring-2" onclick="deletePasswords('${element.Website}')">Delete</button>
        </td>
      </tr>`;
    }

    tb.innerHTML = "";
    tb.innerHTML = str;
  }
};

showPassword();

document.querySelector("#btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked");
  let Website = document.getElementById("Website");
  let Username = document.getElementById("Username");
  let Password = document.getElementById("Password");

  console.log(Website.value, Username.value, Password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);
  if (passwords == null) {
    let json = [];
    json.push({
      Website: Website.value,
      Username: Username.value,
      Password: Password.value,
    });
    alert("Password Saved!");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      Website: Website.value,
      Username: Username.value,
      Password: Password.value,
    });
    alert("Password Saved!");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPassword();
});
