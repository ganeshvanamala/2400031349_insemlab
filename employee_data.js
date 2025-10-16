document.addEventListener("DOMContentLoaded", () => {
  const employees = [
    { name: "Aarav", department: "Human Resources", salary: 52000 },
    { name: "Neha ", department: "Engineering", salary: 78000 },
    { name: "Rohan ", department: "Marketing", salary: 61000 },
    { name: "Priya ", department: "Finance", salary: 72000 },
    { name: "Vikram ", department: "Engineering", salary: 85000 },
    { name: "Ananya ", department: "Design", salary: 68000 },
  ];

  const table = document.querySelector("table");

  let sortConfig = { key: null, direction: "asc" };

  function renderRows(data) {

    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    data.forEach(emp => {
      const row = table.insertRow();
      row.insertCell().textContent = emp.name;
      row.insertCell().textContent = emp.department;
      row.insertCell().textContent = `₹${emp.salary.toLocaleString()}`;
    });
  }

  function sortData(key) {
    if (sortConfig.key === key) {
      sortConfig.direction = sortConfig.direction === "asc" ? "desc" : "asc";
    } else {
      sortConfig.key = key;
      sortConfig.direction = "asc";
    }

    const sorted = [...employees].sort((a, b) => {
      if (typeof a[key] === "string") {
        return sortConfig.direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        return sortConfig.direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
    });

    renderRows(sorted);
    updateHeaderSortIndicator();
  }

  function updateHeaderSortIndicator() {
    const headers = table.querySelectorAll("th");
    headers.forEach(th => th.classList.remove("sorted-asc", "sorted-desc"));
    if (sortConfig.key) {
      const headerMap = { name: 0, department: 1, salary: 2 };
      const colIndex = headerMap[sortConfig.key];
      const header = headers[colIndex];
      header.classList.add(sortConfig.direction === "asc" ? "sorted-asc" : "sorted-desc");
    }
  }

  
  const headers = table.querySelectorAll("th");
  headers[0].addEventListener("click", () => sortData("name"));
  headers[1].addEventListener("click", () => sortData("department"));
  headers[2].addEventListener("click", () => sortData("salary"));

  
  renderRows(employees);
});
