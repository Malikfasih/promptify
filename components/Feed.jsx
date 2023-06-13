"use client";

import { headers } from "@next.config";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// export const revalidate = 30;
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // const fetchPosts = async () => {
  //   const response = await fetch("/api/prompt", {
  //     headers: {
  //       "Cache-Control": "no-cache",
  //     },
  //   });
  //   const data = await response.json();
  //   console.log("all fetching prompts -->", data);

  //   setAllPosts(data);
  // };
  // console.log("allPosts state -->", allPosts);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prompts");
      }

      const data = await response.json();
      console.log("all fetching prompts -->", data);
      setAllPosts(data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //   const filterPrompts = (searchtext) => {
  //     const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  //     return allPosts.filter(
  //       (item) =>
  //         regex.test(item.creator.username) ||
  //         regex.test(item.tag) ||
  //         regex.test(item.prompt)
  //     );
  //   };

  const handleSearchChange = (e) => {
    // clearTimeout(searchTimeout);
    // setSearchText(e.target.value);
    // // debounce method
    // setSearchTimeout(
    //   setTimeout(() => {
    //     const searchResult = filterPrompts(e.target.value);
    //     setSearchedResults(searchResult);
    //   }, 500)
    // );
  };

  const handleTagClick = (tagName) => {
    // setSearchText(tagName);
    // const searchResult = filterPrompts(tagName);
    // setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
