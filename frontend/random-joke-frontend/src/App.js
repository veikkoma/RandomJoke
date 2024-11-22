import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [joke, setJoke] = useState("");

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_URL}/jokes/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [API_URL]);

    const fetchJoke = async () => {
        if (!selectedCategory) {
            alert("Please select a category");
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/jokes/category/${selectedCategory}`);
            console.log("Fetched joke:", response.data);
            setJoke(response.data.joke || "No joke found!");
        } catch (error) {
            console.error("Error fetching joke:", error.response?.data || error.message);
            alert("Failed to fetch a joke. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "green" }}>Chuck Norris Jokes</h1>
            <div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: "10px", marginRight: "10px", borderRadius: "5px" }}
                >
                    <option value="">-- Select Category --</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button
                    onClick={fetchJoke}
                    style={{
                        padding: "10px",
                        backgroundColor: "green",
                        color: "white",
                        borderRadius: "5px",
                        cursor: "pointer",
                        border: "none",
                    }}
                >
                    Get Joke
                </button>
            </div>
            {joke && (
                <p style={{ marginTop: "20px", fontSize: "18px", color: "gray" }}>
                    {joke}
                </p>
            )}
        </div>
    );
}

export default App;
