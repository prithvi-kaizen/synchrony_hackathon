import fs from 'fs';
import path from 'path';

export function parseLegalHTML(filename: string): string {
  const filePath = path.join(process.cwd(), 'legal', filename);
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  
  // Extract body content and clean up
  let bodyContent = htmlContent;
  
  // Remove style tags
  bodyContent = bodyContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Extract content between body tags if they exist
  const bodyMatch = bodyContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1];
  }
  
  // Remove script tags
  bodyContent = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  
  // Clean up excessive whitespace
  bodyContent = bodyContent.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Remove data-custom-class attributes and bdt tags
  bodyContent = bodyContent.replace(/data-custom-class="[^"]*"/g, '');
  bodyContent = bodyContent.replace(/<bdt[^>]*>/g, '');
  bodyContent = bodyContent.replace(/<\/bdt>/g, '');
  
  // Convert to more semantic HTML
  bodyContent = bodyContent.replace(/class="block-component"/g, '');
  bodyContent = bodyContent.replace(/class="statement-end-if-in-editor"/g, '');
  bodyContent = bodyContent.replace(/class="question"/g, '');
  
  // Clean up empty tags
  bodyContent = bodyContent.replace(/<(\w+)(\s[^>]*)?\s*>\s*<\/\1>/g, '');
  
  // Fix spacing issues
  bodyContent = bodyContent.trim();
  
  return bodyContent;
}