import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [joke, setJoke] = useState("");

    const API_URL = "http://localhost:5000/api";

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
    }, []);

    const fetchJoke = async () => {
        if (!selectedCategory) {
            alert("Please select a category");
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/jokes/category/${selectedCategory}`);
            setJoke(response.data.joke || "No joke found!");
        } catch (error) {
            console.error("Error fetching joke:", error.response?.data || error.message);
            alert("Failed to fetch a joke. Please try again.");
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">Dog Joke Teller</h1>
            <div className="category-select">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="dropdown"
                >
                    <option value="">-- Select Category --</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button onClick={fetchJoke} className="fetch-joke-button">
                    Get Joke
                </button>
            </div>
            <div className="joke-display">
                <img src="/dog.png" alt="Dog" className="dog-image" />
                {joke && (
                    <div className="speech-bubble">
                        <p>{joke}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
