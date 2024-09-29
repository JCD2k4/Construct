from flask import Flask, send_file
import os
import sys
import subprocess
import cv2
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import shutil
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Serve the videos directory
app.mount("/videos", StaticFiles(directory="../savedVideos"), name="videos")


# Example root endpoint to check the API is working
@app.get("/")
async def root():
    return {"message": "Video serving API"}


# Command Model
class Command(BaseModel):
    cmd: str


@app.post("/input-command")
async def runRenderCommand(command: Command):
    command_split = command.cmd.split()

    # prevents user from just inputting whatever they want
    if command_split[0] != "ns-render":
        return {"error": "Not a valid command"}

    try:
        subprocess.run(command_split)
    except:
        return {"error": "Not a valid command"}

    print("Process Complete")
    return {"message": command_split}


@app.post("/file-upload")
async def upload_video(file: UploadFile = File(...)):
    # Check file extension (Optional, for safety)
    if file.content_type != "video/mp4":
        return {"error": "File must be an MP4 video."}
    new_name = file.filename.split(".")
    folderName = new_name[0]
    # Define the path where to save the file
    # video_path = f"{UPLOAD_FOLDER}/{file.filename}"

    # Save the uploaded file
    # with open(video_path, "wb") as buffer:
    # shutil.copyfileobj(file.file, buffer)
    # parseFrames(file, folderName)
    return {"filename": file.filename, "message": "Video uploaded successfully"}


# print(os.listdir("./construct/app/pythonRouter/"))

# common commands
"""
ns-train nerfacto
--data: Compiler Flag for the input data path
--output-dir: path to put the output

"""


def startTraining():
    return


def processData(filePath):
    outputPath = "../savedVideos"
    subprocess.run(
        ["ns-process-data", "video", "--data", filePath, "--output-dir", outputPath]
    )
    return


# Parses frames from videos
def parseFrames(video_path, newFolderName):
    """
    This function takes in a file path to a video, then parses the video
    into frames for an AI model to use.
    """
    output_dir = "../savedFrames"
    if not os.path.exists(f"{output_dir}/{newFolderName}"):
        os.makedirs(f"{output_dir}/{newFolderName}")
    else:
        raise ValueError("This File Path Already Exists; Try using another name")

    video = cv2.VideoCapture(video_path)

    # if the file given does not exist
    if not video.isOpened():
        raise ValueError("Video Path does not exist")

    output_dir = f"../savedFrames/{newFolderName}"
    numFrames = 0

    while True:
        ret, frame = video.read()
        if not ret:
            break

        frame_filename = os.path.join(output_dir, f"frame_{numFrames:05d}.jpg")
        cv2.imwrite(frame_filename, frame)
        numFrames += 1

    video.release()
    cv2.destroyAllWindows()

    print("Extracted {numFrames} frames")


# parseFrames()
