import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api";

function App() {
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
const [departmentForm, setDepartmentForm] = useState({
  departmentName: "",
  description: "",
  companyId: 1,
});
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    industry: "",
    logoUrl: "",
  });

  const loadCompanies = async () => {
    try {
      const response = await fetch(`${API}/companies`);
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to load companies:", error);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await fetch(`${API}/departments`);
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  useEffect(() => {
    loadCompanies();
    loadDepartments();
  }, []);

  const handleCompanyChange = (event) => {
    setCompanyForm({
      ...companyForm,
      [event.target.name]: event.target.value,
    });
  };
const handleDepartmentChange = (event) => {
  setDepartmentForm({
    ...departmentForm,
    [event.target.name]: event.target.value,
  });
};

const createDepartment = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`${API}/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentName: departmentForm.departmentName,
        description: departmentForm.description,
        companyId: Number(departmentForm.companyId),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create department");
    }

    setDepartmentForm({
      departmentName: "",
      description: "",
      companyId: 1,
    });

    await loadDepartments();

    alert("Department created successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to create department");
  }
};
  const createCompany = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyForm),
      });

      if (!response.ok) {
        throw new Error("Failed to create company");
      }

      setCompanyForm({
        companyName: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        industry: "",
        logoUrl: "",
      });

      await loadCompanies();

      alert("Company created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create company");
    }
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>◆</span> CompanyOS
        </div>

        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#companies">Companies</a>
          <a href="#departments">Departments</a>
          <a href="#add-company">Add Company</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="dashboard">
          <p className="eyebrow">BUSINESS OPERATING SYSTEM</p>

          <h1>Manage your company in one place.</h1>

          <p className="hero-text">
            CompanyOS brings company structure and operations together through
            one simple platform.
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Companies</span>
            <strong>{companies.length}</strong>
          </div>

          <div className="stat-card">
            <span>Departments</span>
            <strong>{departments.length}</strong>
          </div>

          <div className="stat-card">
            <span>System Status</span>
            <strong className="online">● Online</strong>
          </div>
        </section>

        <section className="section" id="companies">
          <div className="section-heading">
            <p className="eyebrow">ORGANIZATION</p>
            <h2>Companies</h2>
          </div>

          <div className="card-grid">
            {companies.length === 0 ? (
              <p>No companies found.</p>
            ) : (
              companies.map((company) => (
                <div className="company-card" key={company.companyId}>
                  <div className="card-actions">
  <button
    onClick={async () => {
      if (!confirm("Delete this company?")) return;

      const response = await fetch(
        `${API}/companies/${company.companyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await loadCompanies();
      }
    }}
  >
    Delete
  </button>
</div>
                  <div className="company-icon">◆</div>

                  <h3>{company.companyName}</h3>

                  <p>{company.industry}</p>

                  <div className="company-details">
                    <span>📍 {company.address}</span>
                    <span>✉ {company.email}</span>
                    <span>☎ {company.phone}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="form-section">
  <div className="section-heading">
    <p className="eyebrow">MANAGEMENT</p>
    <h2>Add Department</h2>
  </div>

  <form className="company-form" onSubmit={createDepartment}>
    <input
      name="departmentName"
      placeholder="Department name"
      value={departmentForm.departmentName}
      onChange={handleDepartmentChange}
      required
    />

    <input
      name="description"
      placeholder="Description"
      value={departmentForm.description}
      onChange={handleDepartmentChange}
      required
    />

    <input
      name="companyId"
      type="number"
      placeholder="Company ID"
      value={departmentForm.companyId}
      onChange={handleDepartmentChange}
      required
    />

    <button type="submit">Create Department</button>
  </form>
</div>
        </section>

        <section className="section form-section" id="add-company">
          <div className="section-heading">
            <p className="eyebrow">MANAGEMENT</p>
            <h2>Add Company</h2>
          </div>

          <form className="company-form" onSubmit={createCompany}>
            <input
              name="companyName"
              placeholder="Company name"
              value={companyForm.companyName}
              onChange={handleCompanyChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={companyForm.email}
              onChange={handleCompanyChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              value={companyForm.phone}
              onChange={handleCompanyChange}
            />

            <input
              name="industry"
              placeholder="Industry"
              value={companyForm.industry}
              onChange={handleCompanyChange}
            />

            <input
              name="website"
              placeholder="Website"
              value={companyForm.website}
              onChange={handleCompanyChange}
            />

            <input
              name="address"
              placeholder="Address"
              value={companyForm.address}
              onChange={handleCompanyChange}
            />

            <input
              name="logoUrl"
              placeholder="Logo URL (optional)"
              value={companyForm.logoUrl}
              onChange={handleCompanyChange}
            />

            <button type="submit">Create Company</button>
          </form>
        </section>

        <section className="section" id="departments">
          <div className="section-heading">
            <p className="eyebrow">STRUCTURE</p>
            <h2>Departments</h2>
          </div>

          <div className="card-grid">
            {departments.length === 0 ? (
              <p>No departments found.</p>
            ) : (
              departments.map((department) => (
                
                <div
                  className="department-card"
                  key={department.departmentId}
                >
                  <div className="card-actions">
  <button
    onClick={async () => {
      if (!confirm("Delete this department?")) return;

      const response = await fetch(
        `${API}/departments/${department.departmentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        await loadDepartments();
      }
    }}
  >
    Delete
  </button>
</div>
                  <h3>{department.departmentName}</h3>

                  <p>{department.description}</p>

                  <span className="badge">
                    Company #{department.companyId}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>© 2026 CompanyOS · MVP</p>
      </footer>
    </div>
  );
}

export default App;