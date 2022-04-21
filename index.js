const SmartPhone = require('./models/smartphone.model');

function main() {
    const smtph = new SmartPhone('MPX200', '1080x1920');
    console.log(smtph.model);
    console.log(smtph.resolution);
}

if (require.main === module) {
    main();
}