"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function ViewerOptions() {
  const [selectedFile, setSelectedFile] = useState(null); // Store selected file
  const [command, setCommand] = useState(""); // Store command input

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Handle file submission
  const handleFileSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    console.log(`Uploading: ${selectedFile.name}`); // Display the file name

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/file-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Handle command input change
  const handleCommandChange = (e) => {
    setCommand(e.target.value); // Update command state
  };

  // Handle render command submission
  const handleRenderCommandSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    console.log(`Command submitted: ${command}`);
  };

  return (
    <div className="flex flex-row">
      {/* File Upload Section */}
      <div>
        <h1 className="text-4xl ml-[246px] mt-[36px]">Add Video</h1>
        <form onSubmit={handleFileSubmit}> {/* Corrected the onSubmit usage */}
          <div
            onClick={() => document.getElementById("addVideo").click()}
            className="btn bg-[#29EB4D] w-[100px] h-[100px] mt-[63px] border rounded-2xl hover:bg-green-500 ml-[285px]"
          >
            <p className="text-white text-[48px] px-[34px] py-[18px]">+</p>
          </div>
          <p className="ml-[280px] mt-[10px]">
            {selectedFile ? selectedFile.name : "No files inputted"}
          </p> {/* Show file name */}
        </form>
        <input
          type="file"
          id="addVideo"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="btn bg-[#0AADFF] hover:bg-blue-600 text-white ml-[221px] w-[228px] h-[62px] mt-[61px] text-[24px]"
          onClick={handleFileSubmit}
        >
          Generate
        </button>
      </div>

      {/* Divider */}
      <div className="h-[325px] w-[1px] bg-black ml-[226px] mt-[60px]"></div>

      {/* Render Command Section */}
      <div>
        <h1 className="text-4xl mt-[36px] ml-[286px]">Render</h1>
        <p className="ml-[186px] mt-[36px]">Enter the command the viewer gave you below</p>
        <form onSubmit={handleRenderCommandSubmit}> {/* Corrected the onSubmit usage */}
          <input
            type="text"
            value={command} // Bind input value to state
            onChange={handleCommandChange} // Handle input change
            placeholder="Command"
            className="input input-bordered max-w-xs ml-[186px] mt-[38px] w-[458px]"
          />
          <button
            type="submit"
            className="btn bg-[#0AADFF] hover:bg-blue-600 text-white ml-[221px] w-[228px] h-[62px] mt-[126px] text-[24px]"
          >
            Submit
          </button>
          <div className="mt-[50px] ml-[136px]">
            <p className="text-red-600 ">
                {"Note: Render time > 1 Hour; RIP Hardware Limitations :("}
                
            </p>
            <Link href="https://viewer.nerf.studio/" className="ml-[70px] text-blue-400">{"Viewer Link Just in Case I Don't Finish"}</Link>
          </div>
          
          
        </form>
        
      </div>
    </div>
  );
}
