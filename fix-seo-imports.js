const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');

function fixSeoImports(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixSeoImports(fullPath);
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let routePath = '/' + path.relative(appDir, dir).replace(/\\/g, '/');
            if (routePath === '/.') {
                routePath = '/';
            }
            
            // Check if pageSeo is imported
            const importRegex = /import\s+{.*?pageSeo.*?}\s+from\s+["'].*?seo-config["'];?/g;
            if (!importRegex.test(content) && content.includes('pageSeo[')) {
                // Find last import
                const allImportsRegex = /^import.*?;?\s*$/gm;
                let lastImportIndex = 0;
                let match;
                while ((match = allImportsRegex.exec(content)) !== null) {
                    lastImportIndex = allImportsRegex.lastIndex;
                }
                
                let importStatement = `\nimport { pageSeo } from "@/app/seo-config";\n`;
                let updatedContent = content.slice(0, lastImportIndex) + importStatement + content.slice(lastImportIndex);
                fs.writeFileSync(fullPath, updatedContent);
                console.log("Added import to", routePath);
            }
        }
    }
}

fixSeoImports(appDir);
