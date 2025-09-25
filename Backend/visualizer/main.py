import os
import uuid
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import generativeai as genai
from PIL import Image
from io import BytesIO

from prompts import SYSTEM_PROMPT, build_user_prompt

# Load env vars
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("Google API key not found. Set it in .env file.")

# Initialize Google GenAI client
genai.configure(api_key=GOOGLE_API_KEY)

# FastAPI app
app = FastAPI(
    title="Safina Carpets Rug Placement API",
    description="Place rugs realistically in room images using Gemini",
    version="1.1"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Safina Carpets Rug Visualizer API is running. Use POST /place-rug/."}

@app.post("/place-rug/")
async def place_rug(
    room_image: UploadFile = File(...),
    rug_image: UploadFile = File(...),
    rug_width_ft: float | None = Form(None),
    rug_length_ft: float | None = Form(None),
    alignment_hint: str | None = Form(None),
    safety_style: str | None = Form(None),
):
    try:
        # Open uploaded images
        room = Image.open(room_image.file)
        rug = Image.open(rug_image.file)

        # Build dynamic user prompt
        user_prompt = build_user_prompt(
            rug_w_ft=rug_width_ft,
            rug_l_ft=rug_length_ft,
            alignment_hint=alignment_hint,
            safety_style=safety_style,
        )

        # Initialize model
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')

        # Convert PIL images to bytes
        rug_bytes = BytesIO()
        room_bytes = BytesIO()
        rug.save(rug_bytes, format='PNG')
        room.save(room_bytes, format='PNG')
        rug_bytes = rug_bytes.getvalue()
        room_bytes = room_bytes.getvalue()

        # Send request to Gemini
        response = model.generate_content(
            [
                SYSTEM_PROMPT, 
                user_prompt,
                {"mime_type": "image/png", "data": rug_bytes},
                {"mime_type": "image/png", "data": room_bytes}
            ]
        )

        if not response.candidates:
            return JSONResponse({"error": "No response from model"}, status_code=500)

        # Extract generated image
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith('image/'):
                gen_img = Image.open(BytesIO(part.inline_data.data))

                # Save unique file
                filename = f"output_{uuid.uuid4().hex}.png"
                gen_img.save(filename)

                return FileResponse(filename, media_type="image/png")

        return JSONResponse({"error": "No image generated"}, status_code=500)

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
