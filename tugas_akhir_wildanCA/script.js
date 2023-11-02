// Mendefinisikan user awal
  const initialUsers = [
   { userId: 1, username: "Bambang", saldo: 1200 },
   { userId: 2, username: "Udin", saldo: 5000 },
   { userId: 3, username: "Jack", saldo: 1800 },
   { userId: 4, username: "Wildan", saldo: 8000 }
  ];

  // Simpan data user di local storage
  if (!localStorage.getItem("users")) {
   localStorage.setItem("users", JSON.stringify(initialUsers));
  }

  // Fungsi untuk mendapatkan data user dari local storage
  function getUsers() {
   return JSON.parse(localStorage.getItem("users"));
  }

  // Fungsi untuk menampilkan daftar user
  function renderUserList() {
  //  const userList = document.getElementById("user-list");
  //  userList.innerHTML = "";

   const itemUserList = document.getElementById("items-balance");
   itemUserList.innerHTML="";

   const users = getUsers();
   for (const user of users) {
    // const listItem = document.createElement("li");
    // listItem.textContent = `User ID: ${user.userId}, Username: ${user.username}, Saldo: ${user.saldo}`;
    // userList.appendChild(listItem);


    const tdUserId = document.createElement("td");
    tdUserId.innerText = user.userId;
    const tdUsername = document.createElement("td");
    tdUsername.innerText = user.username;
    const tdSaldo = document.createElement("td");
    tdSaldo.innerText = user.saldo;
    const tr = document.createElement("tr");

    tr.appendChild(tdUserId);
    tr.appendChild(tdUsername);
    tr.appendChild(tdSaldo);
    itemUserList.appendChild(tr);

  }

  }

  // Fungsi untuk menampilkan daftar username di dropdown
  function renderUserDropdowns() {
   const topUpUsername = document.getElementById("top-up-username");
   const fromUsername = document.getElementById("from-username");
   const toUsername = document.getElementById("to-username");

   const users = getUsers();
   topUpUsername.innerHTML = fromUsername.innerHTML = toUsername.innerHTML = "";

   for (const user of users) {
    const option = document.createElement("option");
    option.value = user.userId;
    option.textContent = user.username;
    topUpUsername.appendChild(option);
    fromUsername.appendChild(option.cloneNode(true));
    toUsername.appendChild(option.cloneNode(true));
   }
  }

  // Fungsi untuk menampilkan riwayat top up
  function renderTopUpHistory() {
   const topUpHistory = document.getElementById("items-top-up-history");
   topUpHistory.innerHTML = "";


   const history = JSON.parse(localStorage.getItem("topUpHistory")) || [];
   for (const transaction of history) {
    // const listItem = document.createElement("li");
    // listItem.textContent = `TrxId: ${transaction.TrxId}, User ID: ${transaction.userId}, Username: ${transaction.username}, Nominal: ${transaction.nominal}`;
    // topUpHistory.appendChild(listItem);

    const tdTrxId = document.createElement("td");
    tdTrxId.innerText = transaction.TrxId;
    const tdUserId = document.createElement("td");
    tdUserId.innerText = transaction.userId;
    const tdUsername = document.createElement("td");
    tdUsername.innerText = transaction.username;
    const tdNominal = document.createElement("td");
    tdNominal.innerText = transaction.nominal;
    const tr = document.createElement("tr");

    tr.appendChild(tdTrxId);
    tr.appendChild(tdUserId);
    tr.appendChild(tdUsername);
    tr.appendChild(tdNominal);
    topUpHistory.appendChild(tr);
   }

   
  }

  // Fungsi untuk menampilkan riwayat transfer
  function renderTransferHistory() {
   const transferHistory = document.getElementById("items-transfer-history");
   transferHistory.innerHTML = "";

   const history = JSON.parse(localStorage.getItem("transferHistory")) || [];
   for (const transaction of history) {
    // const listItem = document.createElement("li");
    // listItem.textContent = `TrxId: ${transaction.TrxId}, From User ID: ${transaction.FromUserId}, To User ID: ${transaction.ToUserId}, Nominal: ${transaction.nominal}`;
   
     const tdTrxId = document.createElement("td");
    tdTrxId.innerText = transaction.TrxId;
    const tdFromUserId = document.createElement("td");
    tdFromUserId.innerText = transaction.FromUserId;
    const tdToUserId = document.createElement("td");
    tdToUserId.innerText = transaction.ToUserId;
    const tdNominal = document.createElement("td");
    tdNominal.innerText = transaction.nominal;
    const tr = document.createElement("tr");

    tr.appendChild(tdTrxId);
    tr.appendChild(tdFromUserId);
    tr.appendChild(tdToUserId);
    tr.appendChild(tdNominal);
    transferHistory.appendChild(tr);

   }
  }

  // Fungsi untuk melakukan top up saldo
  function topUp(userId, amount) {
   const users = getUsers();
   for (const user of users) {
    if (user.userId === userId) {
     user.saldo += amount;
     break;
    }
   }
   localStorage.setItem("users", JSON.stringify(users));

   // Simpan riwayat top up
   const topUpHistory = JSON.parse(localStorage.getItem("topUpHistory")) || [];
   const TrxId = topUpHistory.length + 1;
   topUpHistory.push({ TrxId, userId, username: getUserById(userId).username, nominal: amount });
   localStorage.setItem("topUpHistory", JSON.stringify(topUpHistory));
  }

  // Fungsi untuk melakukan transfer saldo
  function transfer(fromUserId, toUserId, amount) {
   const users = getUsers();
   for (const user of users) {
    if (user.userId === fromUserId) {
     if (user.saldo >= amount) {
      user.saldo -= amount;
     } else {
      alert("Saldo tidak mencukupi untuk transfer");
      return;
     }
    }
   }
   for (const user of users) {
    if (user.userId === toUserId) {
     user.saldo += amount;
    }
   }
   localStorage.setItem("users", JSON.stringify(users));

   // Simpan riwayat transfer
   const transferHistory = JSON.parse(localStorage.getItem("transferHistory")) || [];
   const TrxId = transferHistory.length + 1;
   transferHistory.push({ TrxId, FromUserId: fromUserId, ToUserId: toUserId, nominal: amount });
   localStorage.setItem("transferHistory", JSON.stringify(transferHistory));
  }

  // Fungsi untuk mendapatkan user berdasarkan ID
  function getUserById(userId) {
   const users = getUsers();
   return users.find(user => user.userId === userId);
  }

  // Event listener untuk tombol Top Up
  document.getElementById("top-up-button").addEventListener("click", function () {
   const userId = parseInt(document.getElementById("top-up-username").value);
   const amount = parseInt(document.getElementById("top-up-amount").value);

   if (!userId || !amount) {
    alert("Harap pilih pengguna dan masukkan nominal saldo");
   } else {
    topUp(userId, amount);
    renderUserList();
    renderTopUpHistory();
    document.getElementById("top-up-username").value = "";
    document.getElementById("top-up-amount").value = "";
   }
  });

  // Event listener untuk tombol Transfer
  document.getElementById("transfer-button").addEventListener("click", function () {
   const fromUserId = parseInt(document.getElementById("from-username").value);
   const toUserId = parseInt(document.getElementById("to-username").value);
   const amount = parseInt(document.getElementById("transfer-amount").value);

   if (!fromUserId || !toUserId || !amount) {
    alert("Harap pilih pengirim, penerima, dan masukkan nominal saldo");
   } else if (fromUserId === toUserId) {
    alert("Pengirim dan penerima harus berbeda");
   } else {
    transfer(fromUserId, toUserId, amount);
    renderUserList();
    renderTransferHistory();
    document.getElementById("from-username").value = "";
    document.getElementById("to-username").value = "";
    document.getElementById("transfer-amount").value = "";
   }
  });

  // Render data awal
  renderUserList();
  renderUserDropdowns();
  renderTopUpHistory();
  renderTransferHistory();