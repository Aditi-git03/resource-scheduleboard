import React, { useState } from "react";

const initialData = [
	{
		role: "Developer",
		allocationType: "Full-time",
		startDate: "2025-05-01",
		endDate: "2025-05-31",
		duration: "1 month",
		numResources: 2,
	},
	{
		role: "Designer",
		allocationType: "Part-time",
		startDate: "2025-06-01",
		endDate: "2025-06-15",
		duration: "2 weeks",
		numResources: 1,
	},
	// ...add more sample data as needed
];

const columns = [
	{ key: "role", label: "Role" },
	{ key: "allocationType", label: "Allocation type" },
	{ key: "startDate", label: "Start date" },
	{ key: "endDate", label: "End date" },
	{ key: "duration", label: "Duration" },
	{ key: "numResources", label: "No. of resources" },
];

export default function Requests() {
	const [data] = useState(initialData);
	const [search, setSearch] = useState("");
	const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	let filteredData = data.filter((row) => {
		return (
			Object.values(row).some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
		);
	});

	if (sortConfig.key) {
		filteredData = [...filteredData].sort((a, b) => {
			if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
			if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
			return 0;
		});
	}

	return (
		<div className="requests-container">
			<div className="requests-header">
				<h2 className="requests-title">All Requests</h2>
				<div className="requests-actions">
					<input
						type="text"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="requests-search"
					/>
					<button className="requests-new-btn">
						+ New Request
					</button>
				</div>
			</div>
			<div className="requests-table-wrapper">
				<table className="requests-table">
					<thead>
						<tr>
							{columns.map((col) => (
								<th key={col.key}>
									<span
										style={{ cursor: "pointer", fontWeight: "bold" }}
										onClick={() => handleSort(col.key)}
									>
										{col.label}
										{sortConfig.key === col.key ? (sortConfig.direction === "asc" ? " ▲" : " ▼") : null}
									</span>
								</th>
							))} 
							{/* test */}
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredData.length === 0 ? (
							<tr>
								<td colSpan={columns.length + 1} style={{ textAlign: "center", padding: 16 }}>
									No requests found.
								</td>
							</tr>
						) : (
							filteredData.map((row, idx) => (
								<tr key={idx}>
									{columns.map((col) => (
										<td key={col.key}>{row[col.key]}</td>
									))}
									<td>
										{/* Edit icon (Font Awesome or SVG) */}
										<span style={{ cursor: "pointer", color: "#1976d2", fontSize: 20, display: 'inline-block' }} title="Edit">
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
