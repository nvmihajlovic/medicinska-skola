const fs = require('fs');

const content = fs.readFileSync('translations-sr-fresh.js', 'utf8');

// Extract JSON part
const match = content.match(/window\.translationData\.sr\s*=\s*(\{[\s\S]+\});?\s*$/);

if (!match) {
    console.log('ERROR: Could not extract JSON from file!');
    process.exit(1);
}

const jsonString = match[1];

try {
    const parsed = JSON.parse(jsonString);
    console.log('✓ JSON is VALID!');
    console.log('\nKeys in root:', Object.keys(parsed).length);
    console.log('Keys in erasmus:', Object.keys(parsed.erasmus || {}).length);
    
    if (parsed.erasmus) {
        console.log('\nFirst 20 keys in erasmus:');
        Object.keys(parsed.erasmus).slice(0, 20).forEach(key => {
            console.log(`  - ${key}`);
        });
        
        console.log('\nChecking specific keys:');
        console.log(`  lajpcig_desc1: ${parsed.erasmus.lajpcig_desc1 ? 'EXISTS' : 'MISSING'}`);
        console.log(`  berlin_desc1: ${parsed.erasmus.berlin_desc1 ? 'EXISTS' : 'MISSING'}`);
    }
} catch (error) {
    console.log('✗ JSON PARSE ERROR:');
    console.log(error.message);
    console.log('\nError at position:', error.message.match(/position (\d+)/)?.[1]);
}
