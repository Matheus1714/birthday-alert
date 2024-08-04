import fs from "node:fs";

export function getFileContent(filePath: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) reject();
      resolve(content);
    });
  });
}
