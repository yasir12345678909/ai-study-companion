import os
async def complete(prompt:str,history:list[dict])->tuple[str,str]:
    key=os.getenv("GEMINI_API_KEY")
    if key:
        try:
            from google import genai
            client=genai.Client(api_key=key); r=client.models.generate_content(model=os.getenv("GEMINI_MODEL","gemini-2.5-flash"),contents=prompt); return r.text,"gemini"
        except Exception: pass
    return "I could not contact the configured AI provider. Please try again shortly.","unavailable"
