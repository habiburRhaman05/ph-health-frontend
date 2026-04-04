import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { extractText } from "unpdf";
import { envVeriables } from "@/config/envVariables";

const groq = new Groq({ apiKey: "" });

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    
    // PDF Text Extraction
    const pdfData = await extractText(new Uint8Array(arrayBuffer));
    
    // Text array হলে join করা, না হলে সরাসরি নেওয়া
    let fullText = Array.isArray(pdfData.text) ? pdfData.text.join(" ") : (pdfData.text || "");

    if (!fullText.trim()) {
      return NextResponse.json({ error: "PDF is empty or unreadable" }, { status: 422 });
    }

    // AI Analysis - প্রম্পটে অবশ্যই 'json' শব্দটি থাকতে হবে
    const completion = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          // এখানে 'json' শব্দটি যোগ করা হয়েছে এরর এড়াতে
          content: "You are an ATS expert. Analyze the resume and provide the result strictly in JSON format." 
        },
        { 
          role: "user", 
          content: `Analyze this resume and return a json object with: score (0-100), skills (array), summary (string), and verdict (string). 
          Resume Text: ${fullText}` 
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }, // এটি ব্যবহার করলে প্রম্পটে 'json' থাকা বাধ্যতামূলক
      temperature: 0.1,
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    console.log(result);
    
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ 
      error: error.message, 
      details: "Ensure your prompt contains the word 'json' when using json_object format." 
    }, { status: error.status || 500 });
  }
}