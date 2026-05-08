const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

function fixSeo(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixSeo(fullPath);
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let routePath = '/' + path.relative(appDir, dir).replace(/\\/g, '/');
            if (routePath === '/.') {
                routePath = '/';
            }
            
            // Generate the new metadata block
            let newMetadata = `export const metadata: Metadata = {
    title: pageSeo["${routePath}"]?.title,
    description: pageSeo["${routePath}"]?.description,
    keywords: pageSeo["${routePath}"]?.keywords,
    alternates: {
        canonical: pageSeo["${routePath}"]?.canonical,
    },
};`;

            // Regex to match existing export const metadata ...
            const metadataRegex = /export const metadata(?:[^{]*)\s*=\s*{[\s\S]*?};/g;
            
            let updatedContent = content;
            if (metadataRegex.test(content)) {
                updatedContent = updatedContent.replace(metadataRegex, newMetadata);
            } else {
                // If it doesn't have metadata, we might need to add it after imports, but the user's issue might just be with ones that have it wrong. Let's just log if it doesn't have metadata.
                console.log("No metadata block found in", routePath);
                continue;
            }

            // Ensure pageSeo is imported
            if (!updatedContent.includes('pageSeo')) {
                // Find last import
                const importRegex = /^import.*?;?\s*$/gm;
                let lastImportIndex = 0;
                let match;
                while ((match = importRegex.exec(updatedContent)) !== null) {
                    lastImportIndex = importRegex.lastIndex;
                }
                
                let importStatement = `\nimport { pageSeo } from "@/app/seo-config";\n`;
                if (!updatedContent.includes('import type { Metadata } from "next"')) {
                     importStatement = `import type { Metadata } from "next";\n` + importStatement;
                }
                updatedContent = updatedContent.slice(0, lastImportIndex) + importStatement + updatedContent.slice(lastImportIndex);
            }
            
            fs.writeFileSync(fullPath, updatedContent);
            console.log("Updated", routePath);
        }
    }
}

fixSeo(appDir);
