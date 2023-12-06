document.addEventListener("DOMContentLoaded", function () {
    const productsTab = document.getElementById("productsTab");
    const usersTab = document.getElementById("usersTab");
    const productsTable = document.getElementById("productsTable");
    const usersTable = document.getElementById("usersTable");
    const addAdminLink = document.getElementById("addAdminLink");

  
    // Initially show the products table
    productsTab.classList.add("active");
    productsTable.style.display = "block";
  
    // Event listeners for tab switching
    productsTab.addEventListener("click", function () {
      productsTab.classList.add("active");
      usersTab.classList.remove("active");
      productsTable.style.display = "block";
      usersTable.style.display = "none";
    });
  
    usersTab.addEventListener("click", function () {
      usersTab.classList.add("active");
      productsTab.classList.remove("active");
      usersTable.style.display = "block";
      productsTable.style.display = "none";
    });
    
    const newProductButton = document.getElementById("newProductButton");

    newProductButton.addEventListener("click", function () {
      window.location.href = "/admin/newProduct";
    });
    

  });
  