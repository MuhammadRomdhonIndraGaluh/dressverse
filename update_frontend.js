const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'uploads') {
                replaceInDir(fullPath);
            }
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Fix uploads where URL is dynamic.
            // Example: `${event.gambar}` -> `${event.gambar}`
            content = content.replace(/`http:\/\/localhost:5000\/uploads\/\$\{([^}]+)\}`/g, '`${$1}`');
            content = content.replace(/"http:\/\/localhost:5000\/uploads\/\$\{([^}]+)\}"/g, '`${$1}`');
            
            // For relative uploads like `${foto}` -> `${foto}`
            content = content.replace(/`\.\.\/uploads\/\$\{([^}]+)\}`/g, '`${$1}`');
            content = content.replace(/"\.\.\/uploads\/\$\{([^}]+)\}"/g, '`${$1}`');
            
            // Edge cases like `${data.foto_karya}`
            // Actually the above regex should catch it.
            
            // Replace API endpoint
            content = content.replace(/http:\/\/localhost:5000/g, '/api');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

replaceInDir('c:/Users/galuh/OneDrive/Tài liệu/dressverse/dressverse');
